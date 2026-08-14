"use client";

import { Button } from "@/components/ui/button";
import {
    IRentalRequest,
    PaymentStatus,
    RentalStatus
} from "@/lib/types";

import { toast } from "sonner";
import { createPaymentSession } from "../../_actions/paymentActions";

type RentNowButtonProps = {
    request: IRentalRequest;
};

export default function RentNowButton({ request }: RentNowButtonProps) {

    const handleRentClick = async () => {

        const result = await createPaymentSession(request.id);

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