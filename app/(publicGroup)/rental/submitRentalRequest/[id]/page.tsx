// import { submitRentalRequest } from "@/app/(dashboardGroup)/_actions/rentalRequestsActions";
// import { toast } from "sonner";
// import { redirect } from "next/navigation";

// export default async function SubmitRentalRequestPage({ params }: { params: Promise<{ propertyId: string }> }) {
//     const { propertyId } = await params;

//     const result = await submitRentalRequest(propertyId);

//     if (result.success) {
//         toast.success(result.message || "Rental request submitted successfully. Please wait for the landlord to accept it.");
//         redirect("tenant-dashboard");
//     }

//     else
//         toast.error(result.message || "Something went wrong.");

//     return (
//         <div>
//             {result.message}
//         </div>
//     );
// }



import { submitRentalRequest } from "@/app/(dashboardGroup)/_actions/rentalRequestsActions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserRole } from "@/lib/types";
import jwt, { JwtPayload } from "jsonwebtoken"

export default async function SubmitRentalRequestPage({ params }: {
    params: Promise<{ propertyId: string }>
}) {
    const { propertyId } = await params;

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken");

    if (!accessToken)
        redirect(`/login?redirectTo=/rental/submitRentalRequest/${propertyId}`);

    const decodedToken = jwt.decode(accessToken.value) as JwtPayload;

    if (decodedToken.role !== UserRole.TENANT)
        redirect(`/${decodedToken.role.toLowerCase()}-dashboard?error=${encodeURIComponent("Only tenants can rent properties")}`);

    const result = await submitRentalRequest(propertyId);

    if (result.success)
        redirect(`/tenant-dashboard?success=${encodeURIComponent(result.message || "Rental request submitted successfully")}`);

    redirect(`/tenant-dashboard?error=${encodeURIComponent(result.message || "Something went wrong")}`);
}