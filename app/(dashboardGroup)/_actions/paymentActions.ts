"use server"

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createPaymentSession = async (id: string) => {
    const accessToken = await isAccessTokenExist();

    const payload = { rentalRequestId: id };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        cache: "no-cache"
    });

    const result = await res.json();

    if (result.success && result.data.paymentUrl) {
        revalidateTag("properties", {
            expire: 0
        });
        
        revalidateTag("my-properties", {
            expire: 0
        });

        redirect(result.data.paymentUrl)
    }

    return result;
}