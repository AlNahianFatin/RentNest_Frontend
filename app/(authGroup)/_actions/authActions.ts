"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken"
import { toast } from "sonner"

type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export const LoginAction = async (redirectTo: string, previousState: LoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = { email, password };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
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

        // redirect("/dashboard", "push"); //by default redirect (server side) redirects as "push", meaning it stores the previous page in history. So, we can go back to the previous page (login in this case), by clicking back button in browser

        // // or by selecting "replace", the login page history won't be stored in browser history and by clicking back, we won't be able to go back to the login page

        if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//"))
            redirect(redirectTo);

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if (decodedToken.role === "USER")
            redirect("/dashboard");
        else if (decodedToken.role === "AUTHOR")
            redirect("/author-dashboard");
        else if (decodedToken.role === "ADMIN")
            redirect("/admin-dashboard");
        else
            toast("Oops! Something went wrong");
    }

    return result;
} 