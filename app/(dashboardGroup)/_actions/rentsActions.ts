"use server"

import { isAccessTokenExist } from "@/service/refreshToken";

export const getMyRents = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
    const params = new URLSearchParams()

    if (query && query.searchTerm)
        params.set("search", query.searchTerm as string)

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/rents?${params.toString()}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "no-cache"
    });

    const result = await res.json();

    return result;
}