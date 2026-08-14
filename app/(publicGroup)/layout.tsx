import React from 'react'
import { getMe } from "@/service/getMe";
import { Navbar } from '@/components/shared/navbar';
import RentalToast from './_components/rentalRequest/RentalToast';


const PublicGroupLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();

    return (
        <div>
            <Navbar user={user} />
            <div className='max-w-7xl mx-auto'>
                <RentalToast />
                {children}
            </div>
        </div>
    )
}

export default PublicGroupLayout