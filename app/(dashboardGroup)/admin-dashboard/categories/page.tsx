import { Suspense } from "react";
import { CategoriesList } from "../../_components/CategoriesList";
import { CategoriesSkeleton } from "../../_components/CategoriesSkeleton";
import { CategoryFormDialog } from "../../_components/CategoryFormDialog";

const CategoriesPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage property categories.
          </p>
        </div>
        <CategoryFormDialog mode="create" />
      </div>

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesList />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;