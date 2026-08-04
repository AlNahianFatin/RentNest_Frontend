import { AllPropertyCard } from "./AllPropertyCard";
import { IProperty } from "@/lib/types";
import { getAllProperties } from "../../_actions/propertiesActions";
import { Building2, CheckCircle2, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function AllPropertiesList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;
    const result = await getAllProperties({ query });

    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No available property found at the moment!
            </p>
        );
    }

    const stats = [
        {
            title: "Available Properties",
            value: result.meta.totalAvailablePropertyCount,
            icon: CheckCircle2,
            description: "Currently available for rent",
        },
        {
            title: "Rented Properties",
            value: result.meta.totalRentedPropertyCount,
            icon: Home,
            description: "Already occupied properties",
        },
        {
            title: "Total Properties",
            value: result.meta.totalPropertyCount,
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

                {result.data.map((property: IProperty | any) => (
                    <AllPropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}

            </div>

        </div>
    );
}