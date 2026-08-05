import { Suspense } from "react";
import { PropertiesSkeleton } from "../../_components/properties/PropertiesSkeleton";
import { MyPropertiesList } from "../../_components/properties/MyPropertiesList";
import { SearchBar } from "@/components/shared/SearchBar";

const MyPropertiesPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Properties</h1>
                </div>

                <SearchBar text={"Search properties..."} />
            </div>

            <Suspense fallback={<PropertiesSkeleton />}>
                <MyPropertiesList />
            </Suspense>
        </div>
    );
};

export default MyPropertiesPage;