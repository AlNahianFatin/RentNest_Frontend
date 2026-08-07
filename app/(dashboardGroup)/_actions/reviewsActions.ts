"use server"

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

type ReviewState = {
    success: boolean;
    statusCode: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
}

export const createReview = async (id: string, prevState: ReviewState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        rating: Number(formData.get("rating")),
        comment: formData.get("comment"),
        propertyId: id
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
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

export const updateReview = async (id: string, prevState: ReviewState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        rating: Number(formData.get("rating")),
        comment: formData.get("comment"),
        propertyId: id
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
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