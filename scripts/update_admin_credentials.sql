UPDATE users 
SET 
    email = 'prestonzen@kaizenapps.com',
    password_hash = 'f81365c1ca9018c99c2db6b8cba0bb10aa66e886a3bc71ebff20e3f8e9bf32fb5',
    updated_at = strftime('%s', 'now')
WHERE id = 'prestonzen';
