import { Suspense } from "react";
import { RentalRequestsSkeleton } from "../../_components/rentalRequests/RentalRequestsSkeleton";
import { RentalRequestsList } from "../../_components/rentalRequests/RentalRequestsList";
// import { SearchBar } from "@/components/shared/SearchBar";

const RentalRequestsPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Rental Requests</h1>
                </div>

                <div className="flex flex-col gap-3 items-end">
                    {/* <SearchBar text="Search rental requests..." /> */}
                </div>
            </div>

            <Suspense fallback={<RentalRequestsSkeleton />}>
                <RentalRequestsList />
            </Suspense>
        </div>
    );
};

export default RentalRequestsPage;