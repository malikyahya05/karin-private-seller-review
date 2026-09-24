-- Run once against this deployment's PostgreSQL database. No leads are inserted.
CREATE TABLE IF NOT EXISTS seller_reviews (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL DEFAULT '',
  address text NOT NULL,
  estimated_value text NOT NULL,
  timeline text NOT NULL,
  message text NOT NULL DEFAULT '',
  attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at bigint NOT NULL,
  ip_hash text NOT NULL,
  notification_status text NOT NULL DEFAULT 'not_configured'
    CHECK (notification_status IN ('not_configured', 'pending', 'sent', 'failed'))
);
CREATE INDEX IF NOT EXISTS idx_seller_reviews_ip_created
  ON seller_reviews (ip_hash, created_at);
