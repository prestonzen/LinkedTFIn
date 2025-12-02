interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const userId = "prestonzen";

    try {
        const { results } = await context.env.DB.prepare(
            "SELECT * FROM skills WHERE user_id = ? ORDER BY endorsements DESC"
        ).bind(userId).all();

        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const userId = "prestonzen";

    try {
        const data = await context.request.json() as any;
        const id = crypto.randomUUID();
        const now = Date.now();

        await context.env.DB.prepare(`
            INSERT INTO skills (id, user_id, name, endorsements, created_at)
            VALUES (?, ?, ?, ?, ?)
        `).bind(
            id,
            userId,
            data.name,
            data.endorsements || 0,
            now
        ).run();

        return new Response(JSON.stringify({ success: true, id }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
