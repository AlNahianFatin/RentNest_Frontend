"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken"
import { toast } from "sonner"
import { UserRole } from "@/lib/types"

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

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if (decodedToken.role === UserRole.TENANT)
            redirect("/tenant-dashboard");
        else if (decodedToken.role === UserRole.LANDLORD)
            redirect("/landlord-dashboard");
        else if (decodedToken.role === UserRole.ADMIN)
            redirect("/admin-dashboard");
        else
            toast("Oops! Something went wrong");
    }

    return result;
}

type RegisterState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        activeStatus: string,
        role: UserRole,
        createdAt: string,
        updatedAt: string
    }
}

export const RegisterAction = async (redirectTo: string, previousState: LoginState, formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    const payload = { name, email, password, role };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success)
        // toast("Regstration successful. Login now to access the endless possibilities");
        redirect("/login?registration=success");

    return result;
} 