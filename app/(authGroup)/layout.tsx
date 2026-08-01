import { ReactNode } from "react";
import React from 'react'
import { getMe } from "@/service/getMe";
import { Navbar } from '@/components/shared/navbar';

export default async function AuthGroupLayout({ children }: { children: ReactNode; }) {
    const user = await getMe();

    return (
        // <div className="flex min-h-screen items-center justify-center">
        //     <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        //         {children}
        //     </div>
        // </div>

        <div>
            <Navbar user={user} />
            <div className='max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    );
}