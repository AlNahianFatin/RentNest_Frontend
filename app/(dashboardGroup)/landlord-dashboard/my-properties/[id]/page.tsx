import { Suspense } from "react";
import { PropertySkeleton } from "../../../_components/properties/PropertySkeleton";
import PropertyDetails from "../../../_components/properties/PropertyDetails";
import { UserRole } from "@/lib/types";

type Props = {
    params: Promise<{ id: string }>;
};

export default function PropertyDetailsPage({ params }: Props, role: UserRole) {
    return (
        <Suspense fallback={<PropertySkeleton />}>
            <PropertyDetails params={params} role={role} />
        </Suspense>
    );
}