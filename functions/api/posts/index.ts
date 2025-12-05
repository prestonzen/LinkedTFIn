interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const query = `
            SELECT p.*, u.username, pr.name, pr.headline, pr.photo_url 
            FROM posts p 
            JOIN users u ON p.user_id = u.id 
            LEFT JOIN profiles pr ON p.user_id = pr.user_id 
            ORDER BY p.created_at DESC
        `;
        const { results } = await context.env.DB.prepare(query).all();
        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 });
    }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { content, imageUrl } = await context.request.json() as any;
        // In a real app, we'd get the user ID from the session/token. 
        // For now, we'll assume it's the logged-in user 'prestonzen' since we don't have full session management on the server yet.
        // Ideally, we'd pass the user ID or verify a token.
        // Let's assume 'prestonzen' for this MVP step as per the single-user nature, 
        // but strictly we should verify.
        const userId = 'prestonzen';

        const id = crypto.randomUUID();
        const timestamp = Math.floor(Date.now() / 1000);

        await context.env.DB.prepare(
            "INSERT INTO posts (id, user_id, content, image_url, created_at) VALUES (?, ?, ?, ?, ?)"
        ).bind(id, userId, content, imageUrl || null, timestamp).run();

        return new Response(JSON.stringify({ success: true, id }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: 'Failed to create post', details: error.message }), { status: 500 });
    }
};
