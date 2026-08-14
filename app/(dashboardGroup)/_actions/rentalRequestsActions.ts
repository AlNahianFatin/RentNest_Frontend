"use server"

import { RequestStatus, UserRole } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const getRentalRequests = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
    const params = new URLSearchParams()

    if (query && query.searchTerm)
        params.set("search", query.searchTerm as string)

    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals?${params.toString()}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "no-cache"
    });

    const result = await res.json();

    return result;
}

export const getMyRentalRequests = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }, role: UserRole) => {
    const params = new URLSearchParams()

    if (query && query.searchTerm)
        params.set("search", query.searchTerm as string)

    const accessToken = await isAccessTokenExist();

    let res = null;
    if (role === UserRole.LANDLORD) {
        res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests?${params.toString()}`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: "no-cache"
        });
    }
    else {
        res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals?${params.toString()}`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: "no-cache"
        });
    }

    const result = await res.json();

    return result;
}

export const manageMyRentalRequests = async (id: string, status: RequestStatus) => {
    const accessToken = await isAccessTokenExist();

    const payload = { status };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests/${id}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        cache: "no-cache"
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("properties", {
            expire: 0
        });
        revalidateTag("my-properties", {
            expire: 0
        });
    }

    return result;
}

export const submitRentalRequest = async (id: string) => {
    const accessToken = await isAccessTokenExist();

    const payload = { propertyId: id };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        cache: "no-cache"
    });

    const result = await res.json();

    // if (result.success) {
    //     revalidateTag("properties", {
    //         expire: 0
    //     });
    // }

    return result;
}