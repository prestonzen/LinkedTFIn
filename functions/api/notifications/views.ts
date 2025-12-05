interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        // For now, assume logged in user is 'prestonzen'
        const userId = 'prestonzen';
        const url = new URL(context.request.url);
        const range = url.searchParams.get('range') || '7d'; // 7d, 30d, 90d

        let timeFilter;
        const now = Math.floor(Date.now() / 1000);

        if (range === '7d') {
            timeFilter = now - (7 * 24 * 60 * 60);
        } else if (range === '30d') {
            timeFilter = now - (30 * 24 * 60 * 60);
        } else {
            timeFilter = now - (90 * 24 * 60 * 60);
        }

        const query = `SELECT COUNT(*) as count FROM profile_views WHERE user_id = ? AND created_at >= ?`;
        const result = await context.env.DB.prepare(query).bind(userId, timeFilter).first();
        const count = result ? result.count : 0;

        return new Response(JSON.stringify({ count, range }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch views' }), { status: 500 });
    }
};
