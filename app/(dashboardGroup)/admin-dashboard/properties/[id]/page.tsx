import { Suspense } from "react";
import { AllPropertySkeleton } from "../../../_components/properties/AllPropertySkeleton";
import AllPropertyDetails from "../../../_components/properties/AllPropertyDetails";

type Props = {
    params: Promise<{ id: string }>;
};

export default function PropertyDetailsPage({ params }: Props) {
    return (
        <Suspense fallback={<AllPropertySkeleton />}>
            <AllPropertyDetails params={params} />
        </Suspense>
    );
}