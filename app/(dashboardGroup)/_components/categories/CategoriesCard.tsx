import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ICategory } from "@/lib/types";
import { CategoryFormDialog } from "../../_components/categories/CategoryFormDialog";

type CategoryCardProps = {
    category: ICategory;
}

export function CategoriesCard({ category }: CategoryCardProps) {
    const propertyCount = category._count?.properties ?? 0;

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-wrap items-center gap-1.5">
                    <Badge>{propertyCount} Properties</Badge>
                </div>
                <CardTitle className="text-lg">{category.propertyType}</CardTitle>
                <CardAction>
                    <CategoryFormDialog mode="edit" category={category} />
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Created on {new Date(category.createdAt).toLocaleDateString()}</span>

                    <span>Last updated on {new Date(category.updatedAt).toLocaleDateString()}</span>

                </div>
            </CardContent>
        </Card>
    )
}