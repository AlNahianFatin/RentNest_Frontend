import { Suspense } from "react";
import { PropertySkeleton } from "../../_components/properties/PropertySkeleton";
import PublicPropertyDetails from "../../_components/properties/PublicPropertyDetails";

type Props = {
    params: Promise<{ id: string }>;
};

export default function PropertyDetailsPage({ params }: Props) {
    return (
        <Suspense fallback={<PropertySkeleton />}>
            <PublicPropertyDetails params={params} />
        </Suspense>
    );
}