"use server"

import { isAccessTokenExist } from "@/service/refreshToken";

export const submitRentalRequest = async (id: string) => {
    const accessToken = await isAccessTokenExist();

    const payload = { propertyId: id };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "no-cache",
        next: {
            revalidate: 60 * 60 * 6
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    return result;
}