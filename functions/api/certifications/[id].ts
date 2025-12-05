interface Env {
    DB: D1Database;
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const userId = "prestonzen";
    const id = context.params.id as string;

    try {
        const data = await context.request.json() as any;
        const now = Date.now();

        await context.env.DB.prepare(`
            UPDATE certifications 
            SET name = ?, organization = ?, issue_date = ?, expiration_date = ?, credential_id = ?, credential_url = ?, logo_url = ?, updated_at = ?
            WHERE id = ? AND user_id = ?
        `).bind(
            data.name,
            data.organization,
            data.issueDate,
            data.expirationDate,
            data.credentialId,
            data.credentialUrl,
            data.logoUrl,
            now,
            id,
            userId
        ).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    const userId = "prestonzen";
    const id = context.params.id as string;

    try {
        await context.env.DB.prepare(
            "DELETE FROM certifications WHERE id = ? AND user_id = ?"
        ).bind(id, userId).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
