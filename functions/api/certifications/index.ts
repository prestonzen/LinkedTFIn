interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const userId = "prestonzen";

    try {
        const { results } = await context.env.DB.prepare(
            "SELECT * FROM certifications WHERE user_id = ? ORDER BY display_order ASC, issue_date DESC"
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

        // Get max display_order
        const { maxOrder } = await context.env.DB.prepare(
            "SELECT MAX(display_order) as maxOrder FROM certifications WHERE user_id = ?"
        ).bind(userId).first() as { maxOrder: number };
        const nextOrder = (maxOrder || 0) + 1;

        await context.env.DB.prepare(`
            INSERT INTO certifications (id, user_id, name, organization, issue_date, expiration_date, credential_id, credential_url, logo_url, display_order, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            id,
            userId,
            data.name,
            data.organization,
            data.issueDate,
            data.expirationDate,
            data.credentialId,
            data.credentialUrl,
            data.logoUrl,
            nextOrder,
            now,
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
