import { PropertyCard } from "./PropertyCard";
import { IProperty, UserRole } from "@/lib/types";
import { getMyProperties } from "../../_actions/propertiesActions";
import { Building2, CheckCircle2, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getCategories } from "../../_actions/categoriesActions";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function MyPropertiesList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;
    const properties = await getMyProperties({ query });

    if (!properties.success || !properties.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No available property found at the moment!
            </p>
        );
    }

    const categories = await getCategories();

    if (!categories.success || !categories.data?.length) 
        return;

    const stats = [
        {
            title: "Available Properties",
            value: properties.meta.totalAvailablePropertyCount,
            icon: CheckCircle2,
            description: "Currently available for rent",
        },
        {
            title: "Rented Properties",
            value: properties.meta.totalRentedPropertyCount,
            icon: Home,
            description: "Already occupied properties",
        },
        {
            title: "Total Properties",
            value: properties.meta.totalPropertyCount,
            icon: Building2,
            description: "Total properties listed",
        },
    ];

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.title}>
                            <CardContent className="flex items-center gap-4 p-5">

                                <div className="rounded-full bg-primary/10 p-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <p className="text-3xl font-bold">
                                        {stat.value}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>

                            </CardContent>
                        </Card>
                    );
                })}

            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {properties.data.map((property: IProperty | any) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        categories={categories.data}
                        role={UserRole.LANDLORD}
                        // showLandlord={false}
                        // showTenant={true}
                    />
                ))}

            </div>

        </div>
    );
}