import { Suspense } from "react";
import { MyRentsList } from "../../_components/rents/MyRentsList";
import { SearchBar } from "@/components/shared/SearchBar";
import { MyRentsSkeleton } from "../../_components/rents/MyRentsSkeleton";

const MyRentsPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">My Rents</h1>
                </div>

                <div className="flex flex-col gap-3 items-end">
                    <SearchBar text="Search properties..." />
                </div>
            </div>

            <Suspense fallback={<MyRentsSkeleton />}>
                <MyRentsList />
            </Suspense>
        </div>
    );
};

export default MyRentsPage;