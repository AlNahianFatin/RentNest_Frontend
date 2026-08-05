import { Suspense } from "react";
import { PropertiesSkeleton } from "../../_components/properties/PropertiesSkeleton";
import { PropertiesList } from "../../_components/properties/PropertiesList";
import { SearchBar } from "@/components/shared/SearchBar";

const PropertiesPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Properties</h1>
                </div>

                <div className="flex flex-col gap-3 items-end">
                    <SearchBar text="Search properties..." />
                </div>
            </div>

            <Suspense fallback={<PropertiesSkeleton />}>
                <PropertiesList />
            </Suspense>
        </div>
    );
};

export default PropertiesPage;