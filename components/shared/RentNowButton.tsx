"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type RentNowButtonProps = {
    propertyId: string;
};

export default function RentNowButton({ propertyId }: RentNowButtonProps) {
    const router = useRouter();

    const handleRentNow = () => {
        router.push(`/rental/submitRentalRequest/${propertyId}`);
    };


    return (
        <Button size="lg" className="w-full sm:w-auto" onClick={handleRentNow} >
            Rent Now
        </Button>
    );
}