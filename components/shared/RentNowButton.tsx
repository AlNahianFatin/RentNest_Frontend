"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type RentNowButtonProps = {
    propertyId: string;
};

export default function RentNowButton({
    propertyId,
}: RentNowButtonProps) {

    const router = useRouter();

    const handleRentNow = async () => {

        // check access token from browser cookies
        const accessToken = document.cookie
            .split("; ")
            .some(cookie => cookie.startsWith("accessToken="));


        if (!accessToken) {
            router.push(`/login?redirectTo=/properties/${propertyId}`);
            return;
        }

        router.push(`/payment/${propertyId}`);
    };


    return (
        <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleRentNow}
        >
            Rent Now
        </Button>
    );
}