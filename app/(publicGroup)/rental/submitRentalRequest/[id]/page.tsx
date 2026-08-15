import { submitRentalRequest } from "@/app/(dashboardGroup)/_actions/rentalRequestsActions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserRole } from "@/lib/types";
import jwt, { JwtPayload } from "jsonwebtoken"

export default async function SubmitRentalRequestPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken");

    if (!accessToken)
        redirect(`/login?redirectTo=/rental/submitRentalRequest/${id}`);

    const decodedToken = jwt.decode(accessToken.value) as JwtPayload;

    if (decodedToken.role !== UserRole.TENANT)
        redirect(`/properties/${id}?error=${encodeURIComponent("Only tenants can rent properties")}`);

    const result = await submitRentalRequest(id);

    if (result.success)
        redirect(`/properties/${id}?success=${encodeURIComponent(result.message || "Rental request submitted successfully")}`);

    redirect(`/properties/${id}?error=${encodeURIComponent(result.message || "Something went wrong")}`);
}