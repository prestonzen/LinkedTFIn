CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Seed some initial posts
INSERT INTO posts (id, user_id, content, image_url, likes, comments, created_at) VALUES 
('post-1', 'prestonzen', 'Just deployed my new portfolio using Cloudflare Pages! #webdev #cloudflare', NULL, 12, 2, strftime('%s', 'now', '-2 hours')),
('post-2', 'prestonzen', 'Learning about D1 databases. It is pretty cool.', NULL, 5, 0, strftime('%s', 'now', '-1 day'));
