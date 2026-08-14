// "use client";

// import { useActionState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { submitRentalRequest } from "@/app/(dashboardGroup)/_actions/rentalRequestsActions";

// export default function SubmitRentalRequestForm({
//     propertyId,
// }: {
//     propertyId: string;
// }) {
//     const router = useRouter();

//     const [state, action, pending] = useActionState(
//         submitRentalRequest,
//         null
//     );

//     useEffect(() => {
//         if (!state) return;

//         if (!state.success) {
//             toast.error(
//                 state.message || "Failed to submit rental request"
//             );
//         }
//     }, [state]);

//     return (
//         <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
//             <div className="space-y-2 text-center">
//                 <h1 className="text-2xl font-bold">
//                     Submit Rental Request
//                 </h1>

//                 <p className="text-gray-500">
//                     Are you sure you want to request this property?
//                 </p>
//             </div>

//             <form action={action}>
//                 <input
//                     type="hidden"
//                     name="propertyId"
//                     value={propertyId}
//                 />

//                 <button
//                     type="submit"
//                     disabled={pending}
//                     className="w-full rounded-md bg-primary px-4 py-2 text-white disabled:opacity-50"
//                 >
//                     {pending
//                         ? "Submitting..."
//                         : "Submit Rental Request"}
//                 </button>
//             </form>
//         </div>
//     );
// }