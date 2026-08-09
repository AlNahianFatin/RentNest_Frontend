"use server"

import { UserRole } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

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

export const getPropertyById = async (id: string, role?: UserRole) => {
    if (role && role === UserRole.ADMIN) {
        const accessToken = await isAccessTokenExist();

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties/${id}`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: "no-cache",
            next: {
                revalidate: 60 * 60 * 6,
                tags: ["propertyById"]
            }
        });
        const result = await res.json();

        return result;
    }

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

type PropertyState = {
    success: boolean;
    statusCode: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
}

export const createProperty = async (prevState: PropertyState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        houseNo: Number(formData.get("houseNo")),
        roadNo: Number(formData.get("roadNo")),
        location: formData.get("location"),
        thumbnail: formData.get("thumbnail"),
        price: Number(formData.get("price")),
        categoryId: formData.get("categoryId"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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

export const updateProperty = async (id: string, prevState: PropertyState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        houseNo: Number(formData.get("houseNo")),
        roadNo: Number(formData.get("roadNo")),
        location: formData.get("location"),
        thumbnail: formData.get("thumbnail"),
        price: Number(formData.get("price")),
        categoryId: formData.get("categoryId"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`, {
        method: "PUT",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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

export const deleteProperty = async (id: string) => {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`, {
        method: "DELETE",
        headers: {
            Cookie: `accessToken=${accessToken}`
        }
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