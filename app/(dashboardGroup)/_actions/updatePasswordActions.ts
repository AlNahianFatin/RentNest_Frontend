"use server"

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

type ProfileState = {
    success: boolean;
    statusCode: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
}

export const updatePassword = async (prevState: ProfileState, formData: FormData) => {
    const accessToken = await isAccessTokenExist();

    const payload = {
        newPassword: formData.get("newPassword"),
        oldPassword: formData.get("oldPassword")
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/updatePassword`, {
        method: "PATCH",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success)
        revalidateTag("my-profile", {
            expire: 0
        });

    return result;
}