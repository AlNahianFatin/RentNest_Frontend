"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
    IRentalRequest,
    PaymentStatus,
    RentalStatus,
    RequestStatus
} from "@/lib/types";

import { toast } from "sonner";
import { manageMyRentalRequests } from "../../_actions/rentalRequestsActions";

type RequestStatusButtonProps = {
    request: IRentalRequest;
};

const RequestOptions = [
    {
        label: "ACCEPT",
        value: RequestStatus.ACCEPTED
    },
    {
        label: "REJECT",
        value: RequestStatus.REJECTED
    },
    {
        label: "PENDING",
        value: RequestStatus.PENDING
    }
];

export default function RequestStatusButton({ request }: RequestStatusButtonProps) {
    const handleStatusChange = async (status: RequestStatus) => {
        const result = await manageMyRentalRequests(request.id, status);

        if (result.success)
            toast.success(result.message);
        else
            toast.error(result.message);
    };

    if (request.payment?.paymentStatus === PaymentStatus.COMPLETED && request.payment?.rentalStatus === RentalStatus.ACTIVE)
        return null;

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="outline" >
                    {request.status}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>

                {
                    RequestOptions.map((option) => (
                        <DropdownMenuItem key={option.value} disabled={request.status === option.value}
                            onSelect={() => handleStatusChange(option.value)
                            } > {option.label}
                        </DropdownMenuItem>
                    ))
                }

            </DropdownMenuContent>

        </DropdownMenu>

    );
}