import { Suspense } from "react";
import { CategoriesList } from "../../_components/categories/CategoriesList";
import { CategoriesSkeleton } from "../../_components/categories/CategoriesSkeleton";
import { CategoryFormDialog } from "../../_components/categories/CategoryFormDialog";
import { SearchBar } from "@/components/shared/SearchBar";

const CategoriesPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold"> Categories </h1>
          <p className="text-sm text-muted-foreground"> Create and manage property categories. </p>
        </div>

        <div className="flex flex-col gap-3 items-end">
          <SearchBar text="Search categories..." />
          <CategoryFormDialog mode="create" />
        </div>

      </div>

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesList />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;