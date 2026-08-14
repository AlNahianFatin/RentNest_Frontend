"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SubmitRequestButtonProps = {
    propertyId: string;
};

export default function SubmitRequestButton({ propertyId }: SubmitRequestButtonProps) {
    const router = useRouter();

    const handleRentNow = () => {
        router.push(`/rental/submitRentalRequest/${propertyId}`);
    };


    return (
        <Button size="lg" className="w-full sm:w-auto" onClick={handleRentNow} >
            Submit Request
        </Button>
    );
}