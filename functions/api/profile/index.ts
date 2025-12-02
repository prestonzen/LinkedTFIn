interface Env {
    DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    // In a real app, we would get the user ID from the session/auth token
    // For this portfolio clone, we'll default to the main user "prestonzen"
    const userId = "prestonzen";

    try {
        const profile = await context.env.DB.prepare(
            "SELECT * FROM profiles WHERE user_id = ?"
        ).bind(userId).first();

        if (!profile) {
            return new Response(JSON.stringify({ error: "Profile not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify(profile), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const userId = "prestonzen"; // Mock auth

    try {
        const data = await context.request.json() as any;

        // Upsert profile
        await context.env.DB.prepare(`
      INSERT INTO profiles (user_id, name, headline, location, about, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        name = excluded.name,
        headline = excluded.headline,
        location = excluded.location,
        about = excluded.about,
        updated_at = excluded.updated_at
    `).bind(
            userId,
            data.name,
            data.headline,
            data.location,
            data.about,
            Date.now()
        ).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
