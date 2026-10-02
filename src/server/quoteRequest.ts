export type QuoteEquipmentInput = {
  servico?: unknown;
  equipamento?: unknown;
  fabricante?: unknown;
  modelo?: unknown;
  faixa?: unknown;
  quantidade?: unknown;
  observacoes?: unknown;
};

export type QuotePayload = {
  clientRequestId?: unknown;
  turnstileToken?: unknown;
  client?: {
    empresa?: unknown;
    nome?: unknown;
    whatsapp?: unknown;
    email?: unknown;
    cidade?: unknown;
  };
  equipments?: unknown;
};

type QuoteEquipment = {
  service: string;
  equipment: string;
  manufacturer: string;
  model: string;
  rangeUnit: string;
  quantity: number;
  notes: string;
};

type QuoteData = {
  clientRequestId: string;
  turnstileToken: string;
  companyName: string;
  contactName: string;
  whatsapp: string;
  email: string;
  cityState: string;
  equipments: QuoteEquipment[];
};

type D1Result<T = unknown> = Promise<T>;
type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  first: <T = unknown>() => D1Result<T | null>;
  run: <T = unknown>() => D1Result<T>;
};

type D1Database = {
  prepare: (query: string) => D1Statement;
  batch?: (statements: D1Statement[]) => Promise<unknown[]>;
};

export type QuoteEnv = {
  QUOTE_DB?: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  QUOTE_ALLOWED_ORIGIN?: string;
  QUOTE_ALLOWED_ORIGINS?: string;
  QUOTE_RESEND_API_KEY?: string;
  QUOTE_EMAIL_FROM?: string;
  QUOTE_EMAIL_TO?: string;
};

type HandlerOptions = {
  fetch?: typeof fetch;
  now?: () => Date;
  randomUUID?: () => string;
  randomBytes?: (length: number) => Uint8Array;
};

type ValidationResult =
  { ok: true; data: QuoteData } | { ok: false; errors: string[] };

const MAX_BODY_BYTES = 32_000;
const MAX_EQUIPMENT_ITEMS = 10;
const PROTOCOL_RANDOM_LENGTH = 8;
const MAX_PROTOCOL_ATTEMPTS = 5;
const RESEND_EMAIL_API_URL = "https://api.resend.com/emails";
const SERVICES = new Set([
  "Calibração",
  "Manutenção",
  "Qualificação",
  "Produto",
]);

const textEncoder = new TextEncoder();

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const limit = (value: string, max: number) => value.length <= max;

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160;

const isUuidLike = (value: string) =>
  /^[a-f0-9-]{20,80}$/i.test(value) || /^[A-Za-z0-9_-]{20,120}$/.test(value);

const validatePayload = (payload: QuotePayload): ValidationResult => {
  const errors: string[] = [];
  const client = payload.client ?? {};
  const companyName = asString(client.empresa);
  const contactName = asString(client.nome);
  const whatsapp = asString(client.whatsapp);
  const email = asString(client.email).toLowerCase();
  const cityState = asString(client.cidade);
  const clientRequestId = asString(payload.clientRequestId);
  const turnstileToken = asString(payload.turnstileToken);

  if (!clientRequestId || !isUuidLike(clientRequestId))
    errors.push("Identificador de envio inválido.");
  if (!turnstileToken || turnstileToken.length > 2048)
    errors.push("Validação anti-spam inválida.");
  if (!companyName || !limit(companyName, 120))
    errors.push("Empresa inválida.");
  if (!contactName || !limit(contactName, 100)) errors.push("Nome inválido.");
  if (!email || !isEmail(email)) errors.push("E-mail inválido.");
  if (!cityState || !limit(cityState, 120)) errors.push("Cidade/UF inválida.");
  if (whatsapp) {
    const digits = whatsapp.replace(/\D/g, "");
    if (
      !limit(whatsapp, 25) ||
      !/^[+\d\s().-]+$/.test(whatsapp) ||
      digits.length < 10 ||
      digits.length > 15
    )
      errors.push("WhatsApp inválido.");
  }

  const rawEquipments = Array.isArray(payload.equipments)
    ? payload.equipments
    : [];
  if (rawEquipments.length < 1 || rawEquipments.length > MAX_EQUIPMENT_ITEMS)
    errors.push("Quantidade de equipamentos inválida.");

  const equipments: QuoteEquipment[] = [];
  for (const [index, raw] of rawEquipments.entries()) {
    const item = (raw ?? {}) as QuoteEquipmentInput;
    const service = asString(item.servico);
    const equipment = asString(item.equipamento);
    const manufacturer = asString(item.fabricante);
    const model = asString(item.modelo);
    const rangeUnit = asString(item.faixa);
    const notes =
      typeof item.observacoes === "string" ? item.observacoes.trim() : "";
    const quantityText = asString(item.quantidade);
    const quantity = Number(quantityText);

    if (!SERVICES.has(service))
      errors.push(`Serviço inválido no item ${index + 1}.`);
    if (!equipment || !limit(equipment, 120))
      errors.push(`Equipamento inválido no item ${index + 1}.`);
    if (!limit(manufacturer, 100))
      errors.push(`Fabricante inválido no item ${index + 1}.`);
    if (!limit(model, 100))
      errors.push(`Modelo inválido no item ${index + 1}.`);
    if (!limit(rangeUnit, 100))
      errors.push(`Faixa/unidade inválida no item ${index + 1}.`);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 9999)
      errors.push(`Quantidade inválida no item ${index + 1}.`);
    if (notes.length > 2000)
      errors.push(`Observações muito longas no item ${index + 1}.`);

    equipments.push({
      service,
      equipment,
      manufacturer,
      model,
      rangeUnit,
      quantity,
      notes,
    });
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      clientRequestId,
      turnstileToken,
      companyName,
      contactName,
      whatsapp,
      email,
      cityState,
      equipments,
    },
  };
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (char) => {
    const replacements: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return replacements[char];
  });

const defaultRandomBytes = (length: number) => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
};

const randomBase36 = (
  length: number,
  randomBytes: (length: number) => Uint8Array,
) => {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const chars: string[] = [];
  const maxUnbiasedByte = Math.floor(256 / alphabet.length) * alphabet.length;
  while (chars.length < length) {
    for (const byte of randomBytes((length - chars.length) * 2)) {
      if (byte >= maxUnbiasedByte) continue;
      chars.push(alphabet[byte % alphabet.length]);
      if (chars.length === length) break;
    }
  }
  return chars.join("");
};

const generateProtocol = (
  date: Date,
  randomBytes: (length: number) => Uint8Array,
) => {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return `DSO-${yyyy}${mm}${dd}-${randomBase36(
    PROTOCOL_RANDOM_LENGTH,
    randomBytes,
  )}`;
};

const allowedOrigins = (env: QuoteEnv) =>
  (env.QUOTE_ALLOWED_ORIGINS || env.QUOTE_ALLOWED_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const verifyTurnstile = async (
  token: string,
  env: QuoteEnv,
  fetcher: typeof fetch,
) => {
  if (!env.TURNSTILE_SECRET_KEY) return false;
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const response = await fetcher(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
};

const buildEmail = (protocol: string, data: QuoteData, createdAt: string) => {
  const subject = `Nova solicitação de orçamento — ${protocol} — ${data.companyName}`;
  const rows = data.equipments
    .map(
      (item, index) => `
${index + 1}. ${item.service} - ${item.equipment}
   Fabricante: ${item.manufacturer || "Não informado"}
   Modelo: ${item.model || "Não informado"}
   Faixa/unidade: ${item.rangeUnit || "Não informado"}
   Quantidade: ${item.quantity}
   Observações: ${item.notes || "Não informado"}`,
    )
    .join("\n");
  const text = `Protocolo: ${protocol}
Data/hora: ${createdAt}
Empresa: ${data.companyName}
Contato: ${data.contactName}
WhatsApp: ${data.whatsapp || "Não informado"}
E-mail: ${data.email}
Cidade/UF: ${data.cityState}

Equipamentos:
${rows}`;

  const htmlItems = data.equipments
    .map(
      (item, index) =>
        `<li><strong>${index + 1}. ${escapeHtml(item.service)} - ${escapeHtml(
          item.equipment,
        )}</strong><ul><li>Fabricante: ${escapeHtml(
          item.manufacturer || "Não informado",
        )}</li><li>Modelo: ${escapeHtml(
          item.model || "Não informado",
        )}</li><li>Faixa/unidade: ${escapeHtml(
          item.rangeUnit || "Não informado",
        )}</li><li>Quantidade: ${item.quantity}</li><li>Observações: ${escapeHtml(
          item.notes || "Não informado",
        )}</li></ul></li>`,
    )
    .join("");
  const html = `<h1>Nova solicitação de orçamento</h1><p><strong>Protocolo:</strong> ${escapeHtml(
    protocol,
  )}</p><p><strong>Data/hora:</strong> ${escapeHtml(
    createdAt,
  )}</p><p><strong>Empresa:</strong> ${escapeHtml(
    data.companyName,
  )}<br><strong>Contato:</strong> ${escapeHtml(
    data.contactName,
  )}<br><strong>WhatsApp:</strong> ${escapeHtml(
    data.whatsapp || "Não informado",
  )}<br><strong>E-mail:</strong> ${escapeHtml(
    data.email,
  )}<br><strong>Cidade/UF:</strong> ${escapeHtml(data.cityState)}</p><h2>Equipamentos</h2><ol>${htmlItems}</ol>`;

  return { subject, text, html };
};

const sendNotification = async (
  protocol: string,
  data: QuoteData,
  createdAt: string,
  env: QuoteEnv,
  fetcher: typeof fetch,
) => {
  if (!env.QUOTE_RESEND_API_KEY || !env.QUOTE_EMAIL_FROM || !env.QUOTE_EMAIL_TO)
    return { status: "not_configured", error: "Resend not configured" };

  const email = buildEmail(protocol, data, createdAt);
  const response = await fetcher(RESEND_EMAIL_API_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.QUOTE_RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.QUOTE_EMAIL_FROM,
      to: [env.QUOTE_EMAIL_TO],
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });
  if (!response.ok)
    return {
      status: "failed",
      error: `Resend API returned ${response.status}`,
    };
  const result = (await response.json().catch(() => ({}))) as { id?: unknown };
  if (typeof result.id !== "string" || !result.id)
    return { status: "failed", error: "Resend API response missing id" };
  return { status: "sent", error: "" };
};

const updateNotification = async (
  db: D1Database,
  id: string,
  status: string,
  error: string,
  attemptedAt: string,
) => {
  await db
    .prepare(
      `UPDATE quote_requests
       SET notification_status = ?, notification_error = ?, notification_attempted_at = ?
       WHERE id = ?`,
    )
    .bind(status, error.slice(0, 500), attemptedAt, id)
    .run();
};

const findProtocolByDedupe = (db: D1Database, dedupeKey: string) =>
  db
    .prepare("SELECT protocol FROM quote_requests WHERE dedupe_key = ?")
    .bind(dedupeKey)
    .first<{ protocol: string }>();

const protocolExists = async (db: D1Database, protocol: string) => {
  const existing = await db
    .prepare("SELECT protocol FROM quote_requests WHERE protocol = ?")
    .bind(protocol)
    .first<{ protocol: string }>();
  return Boolean(existing?.protocol);
};

const isUniqueConstraintError = (error: unknown) =>
  error instanceof Error && /unique|constraint/i.test(error.message);

const insertQuote = async (
  db: D1Database,
  id: string,
  protocol: string,
  createdAt: string,
  data: QuoteData,
) => {
  const requestStatement = db
    .prepare(
      `INSERT INTO quote_requests (
        id, protocol, dedupe_key, status, company_name, contact_name, whatsapp,
        email, city_state, equipment_count, notification_status, created_at, updated_at
      ) VALUES (?, ?, ?, 'received', ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
    )
    .bind(
      id,
      protocol,
      data.clientRequestId,
      data.companyName,
      data.contactName,
      data.whatsapp,
      data.email,
      data.cityState,
      data.equipments.length,
      createdAt,
      createdAt,
    );

  const itemStatements = data.equipments.map((item, index) =>
    db
      .prepare(
        `INSERT INTO quote_request_items (
          id, request_id, item_order, service, equipment, manufacturer, model,
          range_unit, quantity, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        `${id}-${index + 1}`,
        id,
        index + 1,
        item.service,
        item.equipment,
        item.manufacturer,
        item.model,
        item.rangeUnit,
        item.quantity,
        item.notes,
      ),
  );

  if (db.batch) await db.batch([requestStatement, ...itemStatements]);
  else {
    await requestStatement.run();
    for (const statement of itemStatements) await statement.run();
  }
};

export const handleQuoteRequest = async (
  request: Request,
  env: QuoteEnv,
  options: HandlerOptions = {},
) => {
  const fetcher = options.fetch ?? fetch;
  const now = options.now ?? (() => new Date());
  const randomUUID = options.randomUUID ?? (() => crypto.randomUUID());
  const randomBytes = options.randomBytes ?? defaultRandomBytes;

  if (request.method !== "POST")
    return json({ ok: false, error: "Método não permitido." }, 405);

  const origins = allowedOrigins(env);
  const origin = request.headers.get("origin");
  if (!origin || origins.length === 0 || !origins.includes(origin))
    return json({ ok: false, error: "Origem não permitida." }, 403);

  if (!env.QUOTE_DB)
    return json(
      { ok: false, error: "Serviço temporariamente indisponível." },
      500,
    );

  const bodyText = await request.text();
  if (textEncoder.encode(bodyText).byteLength > MAX_BODY_BYTES)
    return json({ ok: false, error: "Solicitação muito grande." }, 413);

  let payload: QuotePayload;
  try {
    payload = JSON.parse(bodyText) as QuotePayload;
  } catch {
    return json({ ok: false, error: "JSON inválido." }, 400);
  }

  const validation = validatePayload(payload);
  if (!validation.ok)
    return json(
      {
        ok: false,
        error: "Revise os campos informados.",
        details: validation.errors,
      },
      400,
    );

  const data = validation.data;
  const existing = await findProtocolByDedupe(
    env.QUOTE_DB,
    data.clientRequestId,
  );
  if (existing?.protocol)
    return json({ ok: true, protocol: existing.protocol, duplicate: true });

  let turnstileOk = false;
  try {
    turnstileOk = await verifyTurnstile(data.turnstileToken, env, fetcher);
  } catch {
    turnstileOk = false;
  }
  if (!turnstileOk)
    return json(
      { ok: false, error: "Não foi possível validar a proteção anti-spam." },
      400,
    );

  const createdDate = now();
  const createdAt = createdDate.toISOString();
  const id = randomUUID();
  let protocol = "";
  let stored = false;

  for (let attempt = 1; attempt <= MAX_PROTOCOL_ATTEMPTS; attempt += 1) {
    protocol = generateProtocol(createdDate, randomBytes);
    try {
      await insertQuote(env.QUOTE_DB, id, protocol, createdAt, data);
      stored = true;
      break;
    } catch (error) {
      const duplicate = await findProtocolByDedupe(
        env.QUOTE_DB,
        data.clientRequestId,
      );
      if (duplicate?.protocol)
        return json({
          ok: true,
          protocol: duplicate.protocol,
          duplicate: true,
        });

      const canRetryProtocol =
        isUniqueConstraintError(error) &&
        (await protocolExists(env.QUOTE_DB, protocol)) &&
        attempt < MAX_PROTOCOL_ATTEMPTS;
      if (canRetryProtocol) continue;

      console.error("quote_insert_failed", { reason: "storage_write_failed" });
      return json(
        { ok: false, error: "Não foi possível registrar a solicitação agora." },
        500,
      );
    }
  }

  if (!stored) {
    console.error("quote_insert_failed", {
      reason: "protocol_retry_exhausted",
    });
    return json(
      { ok: false, error: "Não foi possível registrar a solicitação agora." },
      500,
    );
  }

  const notificationAttemptedAt = now().toISOString();
  try {
    const notification = await sendNotification(
      protocol,
      data,
      createdAt,
      env,
      fetcher,
    );
    await updateNotification(
      env.QUOTE_DB,
      id,
      notification.status,
      notification.error,
      notificationAttemptedAt,
    );
  } catch {
    console.error("quote_notification_failed", {
      reason: "notification_exception",
    });
    try {
      await updateNotification(
        env.QUOTE_DB,
        id,
        "failed",
        "Notification failed after quote storage",
        notificationAttemptedAt,
      );
    } catch {
      console.error("quote_notification_status_update_failed", {
        reason: "notification_status_update_failed",
      });
    }
  }

  return json({ ok: true, protocol });
};
