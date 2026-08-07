import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


export function MyRentalRecordsSkeleton() {

    return (
        <div className="space-y-6">

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-x-50 gap-y-6 md:grid-cols-2">

                {[1, 2].map((item) => (
                    <Card key={item}>
                        <CardContent className="flex items-center gap-3 p-3">

                            <Skeleton className="h-8 w-8 rounded-full" />

                            <div className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-3 w-40" />
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
                                            "Landlord",
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

                                                    <Skeleton className="h-12 w-12 rounded-md" />

                                                    <div className="space-y-2">

                                                        <Skeleton className="h-4 w-32" />

                                                        <Skeleton className="h-3 w-40" />

                                                        <Skeleton className="h-4 w-20" />

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Landlord */}
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


                                            {/* Rented On */}
                                            <td className="px-4 py-4">

                                                <Skeleton className="h-4 w-24" />

                                            </td>


                                            {/* Rental Expires */}
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