interface Env {
    DB: D1Database;
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    const userId = "prestonzen";
    const id = context.params.id as string;

    try {
        await context.env.DB.prepare(
            "DELETE FROM skills WHERE id = ? AND user_id = ?"
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
