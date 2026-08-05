import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UsersSkeleton() {
    return (
        <div className="space-y-6">

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent className="flex items-center gap-4 p-8">

                            <Skeleton className="h-10 w-8 rounded-full" />

                            <div className="space-y-2">

                                <Skeleton className="h-3 w-24" />

                                <Skeleton className="h-6 w-10" />

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

                            {/* Header */}
                            <thead className="border-b bg-muted/50">

                                <tr>

                                    {[
                                        "Property",
                                        "Landlord",
                                        "Tenant",
                                        "Request",
                                        "Payment",
                                        "Rental",
                                        "Requested On",
                                        "Rental Expires",
                                    ].map((item) => (
                                        <th
                                            key={item}
                                            className="px-4 py-3 text-left"
                                        >
                                            <Skeleton className="h-4 w-20" />
                                        </th>
                                    ))}

                                </tr>

                            </thead>


                            <tbody>

                                {Array.from({ length: 5 }).map((_, index) => (

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


                                        {/* Tenant */}
                                        <td className="px-4 py-4">

                                            <div className="space-y-2">

                                                <Skeleton className="h-4 w-28" />

                                                <Skeleton className="h-3 w-36" />

                                            </div>

                                        </td>


                                        {/* Request Badge */}
                                        <td className="px-4 py-4">

                                            <Skeleton className="h-6 w-20 rounded-full" />

                                        </td>


                                        {/* Payment Badge */}
                                        <td className="px-4 py-4">

                                            <Skeleton className="h-6 w-20 rounded-full" />

                                        </td>


                                        {/* Rental Badge */}
                                        <td className="px-4 py-4">

                                            <Skeleton className="h-6 w-20 rounded-full" />

                                        </td>


                                        {/* Requested Date */}
                                        <td className="px-4 py-4">

                                            <Skeleton className="h-4 w-24" />

                                        </td>


                                        {/* Expiry Date */}
                                        <td className="px-4 py-4">

                                            <Skeleton className="h-4 w-24" />

                                        </td>


                                    </tr>

                                ))}


                            </tbody>

                        </table>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}