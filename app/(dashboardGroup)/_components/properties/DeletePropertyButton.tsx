"use client";

import { CardAction } from "@/components/ui/card";
import { PropertyFormDialog } from "./PropertyFormDialog";
import { IProperty } from "@/lib/types";

type Props = {
    property: IProperty;
};

export function DeletePropertyButton({
    property
}: Props) {
    return (
        <CardAction>
            <PropertyFormDialog
                mode="delete"
                property={property}
            />
        </CardAction>
    );
}