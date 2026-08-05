import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MyRentalsSkeleton() {
    return (
        <div className="space-y-6">

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 gap-50 md:grid-cols-2">

                {Array.from({ length: 2 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent className="flex items-center gap-3 p-3">

                            <Skeleton className="h-10 w-10 rounded-full" />

                            <div className="space-y-2 space-x-20">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-6 w-20" />
                            </div>

                        </CardContent>
                    </Card>
                ))}

            </div>



            {/* Table Skeleton */}
            <Card>

                <CardContent className="p-0">

                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-250 text-sm">

                            <thead className="border-b bg-muted/50">

                                <tr>

                                    {
                                        [
                                            "Property",
                                            "Tenant",
                                            "Payment Status",
                                            "Rental Status",
                                            "Rented On",
                                            "Rental Expires"
                                        ].map((header) => (
                                            <th
                                                key={header}
                                                className="px-4 py-3 text-left"
                                            >
                                                {header}
                                            </th>
                                        ))
                                    }

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    Array.from({ length: 5 }).map((_, index) => (

                                        <tr
                                            key={index}
                                            className="border-b"
                                        >

                                            {/* Property */}
                                            <td className="px-4 py-4">

                                                <div className="flex items-center gap-3">

                                                    <Skeleton className="h-22 w-25 rounded-md" />

                                                    <div className="space-y-2">

                                                        <Skeleton className="h-4 w-36" />

                                                        <Skeleton className="h-3 w-44" />

                                                        <Skeleton className="h-4 w-20" />

                                                    </div>

                                                </div>

                                            </td>



                                            {/* Tenant */}
                                            <td className="px-4 py-4">

                                                <div className="space-y-2">

                                                    <Skeleton className="h-4 w-28" />

                                                    <Skeleton className="h-3 w-36" />

                                                </div>

                                            </td>



                                            {/* Payment Status */}
                                            <td className="px-4 py-4">

                                                <Skeleton className="h-6 w-24 rounded-full" />

                                            </td>



                                            {/* Rental Status */}
                                            <td className="px-4 py-4">

                                                <Skeleton className="h-6 w-24 rounded-full" />

                                            </td>



                                            {/* Date */}
                                            <td className="px-4 py-4">

                                                <Skeleton className="h-4 w-24" />

                                            </td>



                                            {/* Expiry */}
                                            <td className="px-4 py-4">

                                                <Skeleton className="h-4 w-24" />

                                            </td>


                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}