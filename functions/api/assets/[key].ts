interface Env {
    BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const key = context.params.key as string;

    if (!key) {
        return new Response('Key not found', { status: 400 });
    }

    const object = await context.env.BUCKET.get(key);

    if (!object) {
        return new Response('Object not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);

    return new Response(object.body, {
        headers
    });
};
