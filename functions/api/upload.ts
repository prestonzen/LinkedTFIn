        });
    } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}
};
