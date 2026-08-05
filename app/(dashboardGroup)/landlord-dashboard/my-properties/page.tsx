import { Suspense } from "react";
import { PropertiesSkeleton } from "../../_components/properties/PropertiesSkeleton";
import { MyPropertiesList } from "../../_components/properties/MyPropertiesList";
import { SearchBar } from "@/components/shared/SearchBar";
import { PropertyFormDialog } from "../../_components/properties/PropertyFormDialog";
import { getCategories } from "../../_actions/categoriesActions";

const MyPropertiesPage = async () => {
    const categories = await getCategories();

    if (!categories.success || !categories.data?.length)
        return;

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-semibold"> Categories </h1>
                    <p className="text-sm text-muted-foreground"> Create and manage property categories. </p>
                </div>

                <div className="flex flex-col gap-3 items-end">
                    <SearchBar text="Search categories..." />
                    <PropertyFormDialog mode="create" categories={categories.data} />
                </div>

            </div>

            <Suspense fallback={<PropertiesSkeleton />}>
                <MyPropertiesList />
            </Suspense>
        </div>
    );
};

export default MyPropertiesPage;