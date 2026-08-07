import { Suspense } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { MyRentalRecordsList } from "../../_components/rents/MyRentalRecordsList";
import { MyRentalRecordsSkeleton } from "../../_components/rents/MyRentalRecordsSkeleton";

const MyRentalRecordsPage = async () => {
    // const categories = await getCategories();

    // if (!categories.success || !categories.data?.length)
    //     return;

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-semibold"> Rental Records </h1>
                    <p className="text-sm text-muted-foreground"> View rental records </p>
                </div>

                <div className="flex flex-col gap-3 items-end">
                    <SearchBar text="Search properties..." />
                    {/* <PropertyFormDialog mode="create" categories={categories.data} /> */}
                </div>

            </div>

            <Suspense fallback={<MyRentalRecordsSkeleton />}>
                <MyRentalRecordsList />
            </Suspense>
        </div>
    );
};

export default MyRentalRecordsPage;