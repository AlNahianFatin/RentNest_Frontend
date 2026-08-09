"use server"

export const getPublicProperties = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
    const params = new URLSearchParams()

    if (query && query.searchTerm)
        params.set("search", query.searchTerm as string);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`, {
        cache: "no-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["properties"]
        }
    });

    const result = await res.json();

    return result;
}