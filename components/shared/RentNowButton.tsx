"use client";

import { submitRentalRequest } from "@/app/(dashboardGroup)/_actions/rentalRequestsActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken"
import { toast } from "sonner";
import { UserRole } from "@/lib/types";

type RentNowButtonProps = {
    propertyId: string;
};

export default function RentNowButton({
    propertyId,
}: RentNowButtonProps) {

    // const router = useRouter();

    // const handleRentNow = async () => {
    //     const accessTokenCookie = document.cookie.split("; ").find(cookie => cookie.startsWith("accessToken="));

    //     if (!accessTokenCookie) {
    //         router.push(`/login?redirectTo=/rental/submitRentalRequest/${propertyId}`);
    //         return;
    //     }

    //     const accessToken = accessTokenCookie.split("=")[1];

    //     const decodedToken = jwt.decode(accessToken) as JwtPayload;

    //     if (decodedToken.role !== UserRole.TENANT) {
    //         toast.error("Only tenants can rent properties");
    //         return;
    //     }

    //     const request = await submitRentalRequest(propertyId);

    //     if (request.success)
    //         toast.success(request.message || "Rental request submitted successfully. Please wait for the landlord to accept it.");
    //     else
    //         toast.error(request.message || "Something went wrong.");
    // };

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