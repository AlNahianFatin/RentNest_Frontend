"use client";

import { Button } from "@/components/ui/button";
import {
    IRentalRequest,
    PaymentStatus,
    RentalStatus
} from "@/lib/types";

import { toast } from "sonner";
import { submitRentalRequest } from "../../_actions/rentalRequestsActions";

type RentButtonProps = {
    request: IRentalRequest;
};

export default function RentButton({ request }: RentButtonProps) {

    const handleRentClick = async () => {

        const result = await submitRentalRequest(request.id);

        if (result.success)
            toast.success(result.message);
        else
            toast.error(result.message);
    };


    if (
        request.payment?.paymentStatus === PaymentStatus.COMPLETED &&
        request.payment?.rentalStatus === RentalStatus.ACTIVE
    )
        return null;


    return (
        <Button onClick={handleRentClick} >
            Rent Now
        </Button>
    );
}