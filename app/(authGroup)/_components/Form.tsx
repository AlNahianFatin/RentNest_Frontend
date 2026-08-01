"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoginAction, RegisterAction } from '../_actions/authActions'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    mode: "login" | "register";
}

const Form = ({ mode }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get("redirectTo") ?? "";

    const serverAction =
        mode === "login"
            ? LoginAction.bind(null, redirectTo)
            : RegisterAction.bind(null, redirectTo);

    const [state, action, pending] = useActionState(serverAction, null);

    useEffect(() => {
        if (!state)
            return;

        if (!state.success) {
            toast.error(
                state.message ||
                (mode === "login"
                    ? "Login failed"
                    : "Registration failed")
            );
        }
    }, [state, mode]);

    useEffect(() => {
        if (searchParams.get("registration") === "success") {
            toast.success(
                "Registration successful. Login now to access the endless possibilities."
            );

            const params = new URLSearchParams(searchParams.toString());
            params.delete("registration");

            router.replace(
                params.toString()
                    ? `${pathname}?${params.toString()}`
                    : pathname
            );
        }
    }, [searchParams, pathname, router]);

    const [role, setRole] = useState("TENANT");

    return (
        <form action={action} className="space-y-4">
            <Card className="p-5 space-y-4">

                {mode === "register" && (
                    <Input
                        name="name"
                        placeholder="Enter your name"
                        required
                    />
                )}

                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />

                {mode === "register" && (
                    <>
                        <input type="hidden" name="role" value={role} />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">{role}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32">
                                <DropdownMenuGroup>
                                    <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
                                        <DropdownMenuRadioItem value="TENANT">TENANT</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="LANDLORD">LANDLORD</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}

                <Button type="submit">
                    {pending
                        ? "Submitting..."
                        : mode === "login"
                            ? "Login"
                            : "Register"}
                </Button>

            </Card>

            <p className="flex justify-center">
                {mode === "login" ? (
                    <>
                        Don&apos;t have an account?&nbsp;
                        <Link
                            href="/register"
                            className="underline hover:text-primary"
                        >
                            Register now
                        </Link>
                    </>
                ) : (
                    <>
                        Already have an account?&nbsp;
                        <Link
                            href="/login"
                            className="underline hover:text-primary"
                        >
                            Login now
                        </Link>
                    </>
                )}
            </p>
        </form>
    )
}

export default Form