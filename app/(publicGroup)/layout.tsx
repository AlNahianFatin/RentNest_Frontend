import React from 'react'
import { getMe } from "@/service/getMe";
import { Navbar } from '@/components/shared/navbar';


const PublicGroupLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();

    return (
        <div>
            <Navbar user={user} />
            <div className='max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default PublicGroupLayout