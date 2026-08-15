import { Suspense } from "react";
import { MyRentalsSkeleton } from "../../_components/rentals/MyRentalsSkeleton";
import { MyRentalsList } from "../../_components/rentals/MyRentalsList";
// import { SearchBar } from "@/components/shared/SearchBar";

const MyRentalsPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">My Rentals</h1>
                    {/* <p className="text-sm text-muted-foreground"> Manage your rental requests. </p> */}
                </div>

                <div className="flex flex-col gap-3 items-end">
                    {/* <SearchBar text="Search rentals..." /> */}
                </div>
            </div>

            <Suspense fallback={<MyRentalsSkeleton />}>
                <MyRentalsList />
            </Suspense>
        </div>
    );
};

export default MyRentalsPage;