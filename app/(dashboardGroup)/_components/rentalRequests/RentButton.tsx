// "use client";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";

// import { Button } from "@/components/ui/button";
// import {
//     IRentalRequest,
//     PaymentStatus,
//     RentalStatus,
//     RequestStatus
// } from "@/lib/types";

// import { toast } from "sonner";
// import { submitRentalRequest } from "../../_actions/rentalRequestsActions";

// type RentButtonProps = {
//     request: IRentalRequest;
// };

// // const RequestOptions = [
// //     {
// //         label: "ACCEPT",
// //         value: RequestStatus.ACCEPTED
// //     },
// //     {
// //         label: "REJECT",
// //         value: RequestStatus.REJECTED
// //     },
// //     {
// //         label: "PENDING",
// //         value: RequestStatus.PENDING
// //     }
// // ];

// export default function RentButton({ request }: RentButtonProps) {
//     const handleRentClick = async () => {
//         const result = await submitRentalRequest(request.property.id);

//         if (result.success)
//             toast.success(result.message);
//         else
//             toast.error(result.message);
//     };


//     // Hide dropdown if payment and rental are completed
//     if (request.payment?.paymentStatus === PaymentStatus.COMPLETED && request.payment?.rentalStatus === RentalStatus.ACTIVE)
//         return null;


//     return (
//         <DropdownMenu>

//             <DropdownMenuTrigger asChild>
//                 <Button variant="outline" >
//                     {request.status}
//                 </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent>

//                 {/* {
//                     RequestOptions.map((option) => (
//                         <DropdownMenuItem key={option.value} disabled={request.status === option.value}
//                             onSelect={() => handleRentClick(option.value)
//                             } > {option.label}
//                         </DropdownMenuItem>
//                     ))
//                 } */}

//             </DropdownMenuContent>

//         </DropdownMenu>

//     );
// }




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