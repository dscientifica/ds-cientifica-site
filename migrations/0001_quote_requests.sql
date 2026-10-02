CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  protocol TEXT NOT NULL UNIQUE,
  dedupe_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'received',
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT NOT NULL,
  city_state TEXT NOT NULL,
  equipment_count INTEGER NOT NULL,
  notification_status TEXT NOT NULL DEFAULT 'pending',
  notification_error TEXT,
  notification_attempted_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quote_request_items (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  item_order INTEGER NOT NULL,
  service TEXT NOT NULL,
  equipment TEXT NOT NULL,
  manufacturer TEXT,
  model TEXT,
  range_unit TEXT,
  quantity INTEGER NOT NULL,
  notes TEXT,
  FOREIGN KEY (request_id) REFERENCES quote_requests(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at
  ON quote_requests(created_at);

CREATE INDEX IF NOT EXISTS idx_quote_requests_status
  ON quote_requests(status);

CREATE INDEX IF NOT EXISTS idx_quote_items_request_id
  ON quote_request_items(request_id);
