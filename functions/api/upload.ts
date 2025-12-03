interface Env {
    BUCKET: R2Bucket;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const formData = await context.request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return new Response('No file uploaded', { status: 400 });
        }

        const key = `${crypto.randomUUID()}-${file.name}`;
        await context.env.BUCKET.put(key, file);

        return new Response(JSON.stringify({ key, url: `/api/assets/${key}` }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: (e as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
