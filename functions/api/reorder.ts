interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { table, items } = await context.request.json() as { table: string, items: string[] };
        const userId = 'prestonzen'; // Hardcoded for now

        console.log(`Reordering ${table} for user ${userId}. Items:`, items);

        if (!['experiences', 'education', 'certifications', 'projects', 'publications'].includes(table)) {
            console.error(`Invalid table: ${table}`);
            return new Response(JSON.stringify({ error: 'Invalid table' }), { status: 400 });
        }

        const stmt = context.env.DB.prepare(`UPDATE ${table} SET display_order = ? WHERE id = ? AND user_id = ?`);
        const batch = items.map((id, index) => stmt.bind(index, id, userId));

        const results = await context.env.DB.batch(batch);
        console.log("Batch update results:", JSON.stringify(results));

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error("Reorder failed:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
