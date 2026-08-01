/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropertyCard } from "@/app/(publicGroup)/_components/properties/PropertyCard";
import { IProperty } from "@/lib/types";
import { getPublicProperties } from "../../_actions/getPublicProperties";

export async function PublicPropertiesList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;
    const result = await getPublicProperties({ query });

    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No available property found at the moment!
            </p>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.data.map((properties: IProperty | any) => (
                    <PropertyCard key={properties.id} property={properties} />
                ))}
            </div>

        </div>
    );
}