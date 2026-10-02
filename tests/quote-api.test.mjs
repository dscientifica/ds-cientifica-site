import { test } from "node:test";
import assert from "node:assert/strict";
import { handleQuoteRequest } from "../src/server/quoteRequest.ts";

const fixedNow = () => new Date("2026-09-18T12:34:56.000Z");
const fixedBytes = () => new Uint8Array([10, 11, 12, 13, 14, 15, 16, 17]);
const fixedUuid = () => "11111111-2222-4333-8444-555555555555";

const validPayload = (overrides = {}) => ({
  clientRequestId: "123e4567-e89b-12d3-a456-426614174000",
  turnstileToken: "turnstile-valid-token",
  client: {
    empresa: "Empresa teste",
    nome: "Pessoa teste",
    whatsapp: "(11) 99999-0000",
    email: "cliente@example.test",
    cidade: "Jundiaí/SP",
  },
  equipments: [
    {
      servico: "Calibração",
      equipamento: "Manômetro digital",
      fabricante: "Fabricante A",
      modelo: "M-1",
      faixa: "0 a 10 bar",
      quantidade: "2",
      observacoes: "Uso em bancada",
    },
    {
      servico: "Manutenção",
      equipamento: "Transmissor de pressão",
      fabricante: "",
      modelo: "",
      faixa: "",
      quantidade: "1",
      observacoes: "",
    },
  ],
  ...overrides,
});

const requestFor = (
  body,
  { method = "POST", origin = "https://www.dscientifica.com.br" } = {},
) => {
  const headers = new Headers({ "content-type": "application/json" });
  if (origin !== null) headers.set("origin", origin);
  return new Request("https://www.dscientifica.com.br/api/orcamento", {
    method,
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
};

class MockStatement {
  constructor(db, query) {
    this.db = db;
    this.query = query;
    this.values = [];
  }

  bind(...values) {
    const statement = new MockStatement(this.db, this.query);
    statement.values = values;
    return statement;
  }

  async first() {
    if (this.query.includes("WHERE dedupe_key = ?")) {
      const record = this.db.requests.find(
        (item) => item.dedupe_key === this.values[0],
      );
      return record ? { protocol: record.protocol } : null;
    }
    if (this.query.includes("WHERE protocol = ?")) {
      const protocol = this.values[0];
      const record = this.db.requests.find(
        (item) => item.protocol === protocol,
      );
      return record || this.db.existingProtocols.has(protocol)
        ? { protocol }
        : null;
    }
    throw new Error(`Unexpected first query: ${this.query}`);
  }

  async run() {
    return this.db.apply(this);
  }
}

class MockD1 {
  constructor({ failBatch = false, existingProtocols = [] } = {}) {
    this.failBatch = failBatch;
    this.existingProtocols = new Set(existingProtocols);
    this.requests = [];
    this.items = [];
  }

  prepare(query) {
    return new MockStatement(this, query);
  }

  async batch(statements) {
    if (this.failBatch) throw new Error("D1 unavailable");
    for (const statement of statements) await this.apply(statement);
    return statements.map(() => ({ success: true }));
  }

  async apply(statement) {
    if (statement.query.includes("INSERT INTO quote_requests")) {
      const [
        id,
        protocol,
        dedupe_key,
        company_name,
        contact_name,
        whatsapp,
        email,
        city_state,
        equipment_count,
        created_at,
        updated_at,
      ] = statement.values;
      if (this.requests.some((item) => item.dedupe_key === dedupe_key))
        throw new Error("UNIQUE constraint failed: quote_requests.dedupe_key");
      if (
        this.existingProtocols.has(protocol) ||
        this.requests.some((item) => item.protocol === protocol)
      )
        throw new Error("UNIQUE constraint failed: quote_requests.protocol");
      this.requests.push({
        id,
        protocol,
        dedupe_key,
        status: "received",
        company_name,
        contact_name,
        whatsapp,
        email,
        city_state,
        equipment_count,
        notification_status: "pending",
        notification_error: "",
        notification_attempted_at: "",
        created_at,
        updated_at,
      });
      return { success: true };
    }
    if (statement.query.includes("INSERT INTO quote_request_items")) {
      const [
        id,
        request_id,
        item_order,
        service,
        equipment,
        manufacturer,
        model,
        range_unit,
        quantity,
        notes,
      ] = statement.values;
      this.items.push({
        id,
        request_id,
        item_order,
        service,
        equipment,
        manufacturer,
        model,
        range_unit,
        quantity,
        notes,
      });
      return { success: true };
    }
    if (statement.query.includes("UPDATE quote_requests")) {
      const [status, error, attemptedAt, id] = statement.values;
      const record = this.requests.find((item) => item.id === id);
      if (record) {
        record.notification_status = status;
        record.notification_error = error;
        record.notification_attempted_at = attemptedAt;
      }
      return { success: true };
    }
    throw new Error(`Unexpected run query: ${statement.query}`);
  }
}

const mockFetch =
  ({ turnstile = true, resend = true, calls = [] } = {}) =>
  async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes("turnstile"))
      return new Response(JSON.stringify({ success: turnstile }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    return new Response(JSON.stringify(resend ? { id: "email-id-test" } : {}), {
      status: resend ? 200 : 500,
      headers: { "content-type": "application/json" },
    });
  };

const envFor = (db, overrides = {}) => ({
  QUOTE_DB: db,
  TURNSTILE_SECRET_KEY: "secret-test",
  QUOTE_ALLOWED_ORIGIN: "https://www.dscientifica.com.br",
  QUOTE_RESEND_API_KEY: "resend-secret",
  QUOTE_EMAIL_FROM: "DS Científica <site@dscientifica.com.br>",
  QUOTE_EMAIL_TO: "comercial@dscientifica.com.br",
  ...overrides,
});

const randomBytesSequence = (values) => {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)];
};

const optionsFor = (fetcher, randomBytes = fixedBytes) => ({
  fetch: fetcher,
  now: fixedNow,
  randomUUID: fixedUuid,
  randomBytes,
});

test("quote API accepts a valid request with multiple equipment items", async () => {
  const db = new MockD1();
  const calls = [];
  const response = await handleQuoteRequest(
    requestFor(validPayload()),
    envFor(db),
    optionsFor(mockFetch({ calls })),
  );
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.protocol, "DSO-20260918-ABCDEFGH");
  assert.equal(db.requests.length, 1);
  assert.equal(db.items.length, 2);
  assert.equal(db.requests[0].notification_status, "sent");
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, "https://api.resend.com/emails");
  assert.equal(calls[1].init.headers.authorization, "Bearer resend-secret");
  assert.deepEqual(JSON.parse(calls[1].init.body).to, [
    "comercial@dscientifica.com.br",
  ]);
});

test("quote API rejects missing required fields", async () => {
  const db = new MockD1();
  const response = await handleQuoteRequest(
    requestFor(
      validPayload({ client: { ...validPayload().client, empresa: "" } }),
    ),
    envFor(db),
    optionsFor(mockFetch()),
  );
  assert.equal(response.status, 400);
  assert.equal(db.requests.length, 0);
});

test("quote API rejects invalid email", async () => {
  const db = new MockD1();
  const response = await handleQuoteRequest(
    requestFor(
      validPayload({ client: { ...validPayload().client, email: "invalido" } }),
    ),
    envFor(db),
    optionsFor(mockFetch()),
  );
  assert.equal(response.status, 400);
});

test("quote API rejects invalid quantity", async () => {
  const db = new MockD1();
  const payload = validPayload();
  payload.equipments[0].quantidade = "0";
  const response = await handleQuoteRequest(
    requestFor(payload),
    envFor(db),
    optionsFor(mockFetch()),
  );
  assert.equal(response.status, 400);
});

test("quote API rejects invalid JSON", async () => {
  const response = await handleQuoteRequest(
    requestFor("{invalid"),
    envFor(new MockD1()),
    optionsFor(mockFetch()),
  );
  assert.equal(response.status, 400);
});

test("quote API rejects invalid Turnstile", async () => {
  const db = new MockD1();
  const response = await handleQuoteRequest(
    requestFor(validPayload()),
    envFor(db),
    optionsFor(mockFetch({ turnstile: false })),
  );
  assert.equal(response.status, 400);
  assert.equal(db.requests.length, 0);
});

test("quote API rejects requests without Origin", async () => {
  const db = new MockD1();
  const response = await handleQuoteRequest(
    requestFor(validPayload(), { origin: null }),
    envFor(db),
    optionsFor(mockFetch()),
  );
  assert.equal(response.status, 403);
  assert.equal(db.requests.length, 0);
});

test("quote API rejects requests from incorrect Origin", async () => {
  const db = new MockD1();
  const response = await handleQuoteRequest(
    requestFor(validPayload(), { origin: "https://example.test" }),
    envFor(db),
    optionsFor(mockFetch()),
  );
  assert.equal(response.status, 403);
  assert.equal(db.requests.length, 0);
});

test("quote API accepts explicitly authorized preview Origin", async () => {
  const db = new MockD1();
  const response = await handleQuoteRequest(
    requestFor(validPayload(), {
      origin: "https://preview.ds-cientifica-site.pages.dev",
    }),
    envFor(db, {
      QUOTE_ALLOWED_ORIGIN: undefined,
      QUOTE_ALLOWED_ORIGINS:
        "https://www.dscientifica.com.br, https://preview.ds-cientifica-site.pages.dev",
    }),
    optionsFor(mockFetch()),
  );
  assert.equal(response.status, 200);
  assert.equal(db.requests.length, 1);
});

test("quote API retries after a true protocol collision", async () => {
  const db = new MockD1({
    existingProtocols: ["DSO-20260918-ABCDEFGH"],
  });
  const randomBytes = randomBytesSequence([
    new Uint8Array([10, 11, 12, 13, 14, 15, 16, 17]),
    new Uint8Array([18, 19, 20, 21, 22, 23, 24, 25]),
  ]);
  const response = await handleQuoteRequest(
    requestFor(validPayload()),
    envFor(db),
    optionsFor(mockFetch(), randomBytes),
  );
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.protocol, "DSO-20260918-IJKLMNOP");
  assert.equal(db.requests.length, 1);
  assert.equal(db.items.length, 2);
});

test("quote API fails safely after exhausting protocol collision retries", async () => {
  const collisions = [
    "DSO-20260918-ABCDEFGH",
    "DSO-20260918-IJKLMNOP",
    "DSO-20260918-QRSTUVWX",
    "DSO-20260918-YZ012345",
    "DSO-20260918-6789ABCD",
  ];
  const db = new MockD1({ existingProtocols: collisions });
  const randomBytes = randomBytesSequence([
    new Uint8Array([10, 11, 12, 13, 14, 15, 16, 17]),
    new Uint8Array([18, 19, 20, 21, 22, 23, 24, 25]),
    new Uint8Array([26, 27, 28, 29, 30, 31, 32, 33]),
    new Uint8Array([34, 35, 0, 1, 2, 3, 4, 5]),
    new Uint8Array([6, 7, 8, 9, 10, 11, 12, 13]),
  ]);
  const response = await handleQuoteRequest(
    requestFor(validPayload()),
    envFor(db),
    optionsFor(mockFetch(), randomBytes),
  );
  const body = await response.json();
  assert.equal(response.status, 500);
  assert.equal(body.ok, false);
  assert.equal(db.requests.length, 0);
  assert.equal(db.items.length, 0);
});

test("quote API treats repeated idempotency key as duplicate after success", async () => {
  const db = new MockD1();
  const env = envFor(db);
  const options = optionsFor(mockFetch());
  const first = await handleQuoteRequest(
    requestFor(validPayload()),
    env,
    options,
  );
  const second = await handleQuoteRequest(
    requestFor(validPayload()),
    env,
    options,
  );
  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.deepEqual(await second.json(), {
    ok: true,
    protocol: "DSO-20260918-ABCDEFGH",
    duplicate: true,
  });
  assert.equal(db.requests.length, 1);
});

test("quote API does not confirm success when D1 fails", async () => {
  const db = new MockD1({ failBatch: true });
  const response = await handleQuoteRequest(
    requestFor(validPayload()),
    envFor(db),
    optionsFor(mockFetch()),
  );
  const body = await response.json();
  assert.equal(response.status, 500);
  assert.equal(body.ok, false);
  assert.equal(db.requests.length, 0);
});

test("quote API keeps stored request when Resend notification fails", async () => {
  const db = new MockD1();
  const response = await handleQuoteRequest(
    requestFor(validPayload()),
    envFor(db),
    optionsFor(mockFetch({ resend: false })),
  );
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.protocol, "DSO-20260918-ABCDEFGH");
  assert.equal(db.requests.length, 1);
  assert.equal(db.items.length, 2);
  assert.equal(db.requests[0].notification_status, "failed");
  assert.match(db.requests[0].notification_error, /Resend API returned 500/);
});
