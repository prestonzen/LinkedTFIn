interface Env {
    DB: D1Database;
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    try {
        const postId = context.params.id;
        // In a real app, verify user owns the post. 
        // For MVP, we assume the logged-in user (prestonzen) owns it or is admin.

        await context.env.DB.prepare(
            "DELETE FROM posts WHERE id = ?"
        ).bind(postId).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete post' }), { status: 500 });
    }
};
