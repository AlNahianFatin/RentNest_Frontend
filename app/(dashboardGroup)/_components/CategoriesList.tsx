/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/lib/types";
import { CategoriesCard } from "./CategoriesCard";
import { getCategories } from "../_actions/categoriesActions";

export async function CategoriesList() {
    const result = await getCategories();

    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No categories found!.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((category: ICategory | any) => (
                <CategoriesCard key={category.id} category={category} />
            ))}
        </div>
    );
}