"use server"

import { isAccessTokenExist } from "@/service/refreshToken";

// for admins
export const getAllProperties = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
    const params = new URLSearchParams()

    if (query && query.searchTerm)
        params.set("search", query.searchTerm as string)

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties?${params.toString()}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "no-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["properties"]
        }
    });

    const result = await res.json();

    return result;
}

export const getPropertyById = async (id: string) => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
        cache: "no-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["propertyById"]
        }
    });

    const result = await res.json();

    return result;
}

// for landlords
export const getMyProperties = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
    const params = new URLSearchParams()

    if (query && query.searchTerm)
        params.set("search", query.searchTerm as string)

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties?${params.toString()}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "no-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["my-properties"]
        }
    });

    const result = await res.json();

    return result;
}