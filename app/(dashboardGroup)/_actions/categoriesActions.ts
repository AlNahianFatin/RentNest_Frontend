"use server"

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const getCategories = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24,
            tags: ["categories"]
        }
    });

    const result = await res.json();

    return result;
}

type CategoryState = {
    success: boolean;
    statusCode: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
}

export const createCategory = async (prevState: CategoryState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        propertyType: formData.get("propertyType")
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success)
        revalidateTag("categories", {
            expire: 0
        });

    return result;
}

export const updateCategory = async (id: string, prevState: CategoryState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        propertyType: formData.get("propertyType")
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success)
        revalidateTag("categories", {
            expire: 0
        });

    return result;
}