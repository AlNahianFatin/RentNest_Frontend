import { Suspense } from "react";
import { PropertySkeleton } from "../../../_components/properties/PropertySkeleton";
import PropertyDetails from "../../../_components/properties/PropertyDetails";

type Props = {
    params: Promise<{ id: string }>;
};

export default function PropertyDetailsPage({ params }: Props) {
    return (
        <Suspense fallback={<PropertySkeleton />}>
            <PropertyDetails params={params} />
        </Suspense>
    );
}