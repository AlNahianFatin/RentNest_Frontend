import { IProperty, UserRole } from "@/lib/types";
import { Banknote, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getMyRents } from "../../_actions/rentsActions";
import { MyRentsCard } from "./MyRentsCard";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function MyRentsList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;
    const rents = await getMyRents({ query });

    if (!rents.success || !rents.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No available rent found at the moment!
            </p>
        );
    }

    const totalRent = rents.meta.rentThisMonth._sum.price ?? 0;

    const stats = [
        {
            title: "Rent",
            value: `৳  ${totalRent}`,
            icon: Banknote,
            description: "Rent for this month",
        },
        {
            title: "Rented Properties",
            value: rents.meta.totalPropertiesCount,
            icon: Home,
            description: "Total number of rented properties",
        }
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 gap-x-50 gap-y-6 md:grid-cols-2">

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

                {rents.data.map((rents: IProperty | any) => (
                    <MyRentsCard
                        key={rents.id}
                        rent={rents}
                        role={UserRole.TENANT}
                    />
                ))}

            </div>

        </div>
    );
}