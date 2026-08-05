"use client";

import { CardAction } from "@/components/ui/card";
import { PropertyFormDialog } from "./PropertyFormDialog";
import { ICategory, IProperty } from "@/lib/types";

type Props = {
    property: IProperty;
    categories: ICategory[];
};

export function EditPropertyButton({
    property,
    categories
}: Props) {
    return (
        <CardAction>
            <PropertyFormDialog
                mode="edit"
                property={property}
                categories={categories}
            />
        </CardAction>
    );
}