import { Suspense } from "react";
import { AllPropertiesSkeleton } from "../../_components/properties/AllPropertiesSkeleton";
import { AllPropertiesList } from "../../_components/properties/AllPropertiesList";
import { PropertySearchBar } from "@/components/shared/PropertySearchBar";

const PropertiesPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Properties</h1>
                    {/* <p className="text-sm text-muted-foreground">
                        Browse the available properties to rent.
                    </p> */}
                </div>

                <PropertySearchBar />
            </div>

            <Suspense fallback={<AllPropertiesSkeleton />}>
                <AllPropertiesList />
            </Suspense>
        </div>
    );
};

export default PropertiesPage;