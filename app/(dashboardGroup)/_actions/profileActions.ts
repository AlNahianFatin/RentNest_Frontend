"use server"

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type ProfileState = {
    success: boolean;
    statusCode: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
}

export const updateProfile = async (prevState: ProfileState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("my-profile", {
            expire: 0
        });
        
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        });
    }

    return result;
}