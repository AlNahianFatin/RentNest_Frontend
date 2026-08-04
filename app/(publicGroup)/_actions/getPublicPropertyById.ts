"use server"

export const getPublicPropertyById = async (id: string) => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
        cache: "no-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["public-propertyById"]
        }
    });

    const result = await res.json();

    return result;
}