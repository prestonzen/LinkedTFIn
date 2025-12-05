CREATE TABLE IF NOT EXISTS profile_views (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  viewer_id TEXT, -- Can be null for anonymous
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Seed some views
INSERT INTO profile_views (id, user_id, viewer_id, created_at) VALUES 
('view-1', 'prestonzen', 'user2', strftime('%s', 'now', '-1 hour')),
('view-2', 'prestonzen', 'user3', strftime('%s', 'now', '-2 hours')),
('view-3', 'prestonzen', NULL, strftime('%s', 'now', '-5 hours')),
('view-4', 'prestonzen', 'user4', strftime('%s', 'now', '-1 day')),
('view-5', 'prestonzen', NULL, strftime('%s', 'now', '-2 days'));
