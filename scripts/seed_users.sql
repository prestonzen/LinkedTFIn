-- Insert or update the user
INSERT INTO users (id, username, email, password_hash, created_at, updated_at)
VALUES (
  'prestonzen', 
  'prestonzen', 
  'prestonzen@kaizenapps.com', 
  'e911b3d0f489d913882774b659beac1dbbf6b52922fc062d4432899e85b44c917', -- SHA-256 of 'Kaizen123!'
  strftime('%s', 'now'), 
  strftime('%s', 'now')
)
ON CONFLICT(id) DO UPDATE SET
  username = excluded.username,
  email = excluded.email,
  password_hash = excluded.password_hash,
  updated_at = excluded.updated_at;
