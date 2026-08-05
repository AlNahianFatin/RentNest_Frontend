import { getRentalRequests } from "../../_actions/rentalRequestsActions";
import { BanknoteArrowDown, BanknoteCheck, BanknoteX, ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus, RentalStatus, RequestStatus } from "@/lib/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function RentalRequestsList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;

    const rental = await getRentalRequests({ query });

    if (!rental.success || !rental.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No renal request record found at the moment!
            </p>
        );
    }

    const stats = [
        {
            title: "Pending Requests",
            value: rental.meta.totalPendingRentalRequestCount,
            icon: BanknoteArrowDown,
            description: "Requests not accepted yet",
        },
        {
            title: "Accepted Requests",
            value: rental.meta.totalAcceptedRentalRequestCount,
            icon: BanknoteCheck,
            description: "Already accepted requests",
        },
        {
            title: "Rejected Requests",
            value: rental.meta.totalRejectedRentalRequestCount,
            icon: BanknoteX,
            description: "Requests rejected by the landlords",
        },
        {
            title: "Total Received Requests",
            value: rental.meta.totalRentalRequestCount,
            icon: ScrollText,
            description: "Total requests received till now",
        },
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.title}>
                            <CardContent className="flex items-center gap-3 p-3">

                                <div className="rounded-full bg-primary/10 p-2 shrink-0">
                                    <Icon className="h-4 w-4 text-primary" />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-xs text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <p className="text-xl font-bold leading-none">
                                        {stat.value}
                                    </p>

                                </div>

                            </CardContent>
                        </Card>
                    );
                })}

            </div>


            <Card>

                <CardContent className="p-0">

                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-250 text-sm">

                            <thead className="border-b bg-muted/50">

                                <tr>

                                    <th className="px-4 py-3 text-left">
                                        Property
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Landlord
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Tenant
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Request
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Payment
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Rental
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Requested On
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Rental Expires
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {rental.data.map((rental: any) => (
                                    <tr
                                        key={rental.id}
                                        className="border-b hover:bg-muted/40"
                                    >

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-3">

                                                <Image
                                                    src={rental.property.thumbnail}
                                                    alt={rental.property.location}
                                                    width={60}
                                                    height={60}
                                                    className="h-12 w-12 rounded-md object-cover"
                                                    unoptimized
                                                />

                                                <div className="min-w-45">

                                                    <p className="font-medium">
                                                        {rental.property.location}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        House #{rental.property.houseNo}
                                                        {" • "}
                                                        Road #{rental.property.roadNo}
                                                    </p>

                                                    <p className="font-semibold">
                                                        ৳ {rental.property.price.toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* Landlord */}
                                        <td className="px-4 py-4">

                                            <p className="font-medium whitespace-nowrap">
                                                {rental.landlord.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground whitespace-nowrap">
                                                {rental.landlord.email}
                                            </p>

                                        </td>

                                        {/* Tenant */}
                                        <td className="px-4 py-4">

                                            <p className="font-medium whitespace-nowrap">
                                                {rental.tenant.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground whitespace-nowrap">
                                                {rental.tenant.email}
                                            </p>

                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    rental.status === RequestStatus.ACCEPTED
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : rental.status === RequestStatus.REJECTED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {rental.status ?? "N/A"}
                                            </Badge>
                                        </td>



                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    rental.payment?.paymentStatus === PaymentStatus.COMPLETED
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : rental.payment?.paymentStatus === PaymentStatus.FAILED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {rental.payment?.paymentStatus ?? "N/A"}
                                            </Badge>
                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    rental.payment?.rentalStatus === RentalStatus.ACTIVE
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : rental.payment?.rentalStatus === RentalStatus.EXPIRED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {rental.payment?.rentalStatus ?? "N/A"}
                                            </Badge>
                                        </td>

                                        {rental.payment?.updatedAt && (<td className="px-4 py-4 whitespace-nowrap">

                                            {new Date(
                                                rental.payment?.updatedAt
                                            ).toLocaleDateString()}

                                        </td>)}

                                        {rental.payment?.currentPeriodEnd && (<td className="px-4 py-4 whitespace-nowrap">

                                            {new Date(
                                                rental.payment?.currentPeriodEnd
                                            ).toLocaleDateString()}

                                        </td>)}

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