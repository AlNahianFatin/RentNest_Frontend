import { Suspense } from "react";
import { MyRentalRequestsList } from "../../_components/rentalRequests/MyRentalRequestsList";
import { RentalRequestsSkeleton } from "../../_components/rentalRequests/RentalRequestsSkeleton";

const MyRentalRequestsPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">My Rental Requests</h1>
                    <p className="text-sm text-muted-foreground"> Manage received rental requests. </p>
                </div>

                {/* <div className="flex flex-col gap-3 items-end">
                    <SearchBar text="Search properties..." />
                </div> */}
            </div>

            <Suspense fallback={<RentalRequestsSkeleton />}>
                <MyRentalRequestsList />
            </Suspense>
        </div>
    );
};

export default MyRentalRequestsPage;