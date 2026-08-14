import { getMyRentalRequests } from "../../_actions/rentalRequestsActions";
import { BanknoteArrowDown, BanknoteCheck, BanknoteX, ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus, PropertyStatus, RentalStatus, RequestStatus, UserRole } from "@/lib/types";
import RequestStatusButton from "./RequestStatusButton";
import RentNowButton from "./RentNowButton";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function MyRentalRequestsList({
    searchParams,
    role
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
    role: UserRole
}) {
    const query = await searchParams;

    const request = await getMyRentalRequests({ query }, role);

    if (!request.success || !request.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No rental request found at the moment!
            </p>
        );
    }

    const stats = [
        {
            title: "Pending Requests",
            value: request.meta.totalPendingRentalRequestCount,
            icon: BanknoteArrowDown,
            description: "Requests not accepted yet",
        },
        {
            title: "Accepted Requests",
            value: request.meta.totalAcceptedRentalRequestCount,
            icon: BanknoteCheck,
            description: "Already accepted requests",
        },
        {
            title: "Rejected Requests",
            value: request.meta.totalRejectedRentalRequestCount,
            icon: BanknoteX,
            description: "Requests rejected",
        }
    ];

    if (role === UserRole.LANDLORD) {
        stats.push({
            title: "Total Received Requests",
            value: request.meta.totalRentalRequestCount,
            icon: ScrollText,
            description: "Total requests received till now",
        })
    }

    else if (role === UserRole.TENANT) {
        stats.push({
            title: "Total Sent Requests",
            value: request.meta.totalRentalRequestCount,
            icon: ScrollText,
            description: "Total requests sent till now",
        })
    }

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


            <Card>

                <CardContent className="p-0">

                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-250 text-sm">

                            <thead className="border-b bg-muted/50">

                                <tr>

                                    <th className="px-4 py-3 text-left">
                                        Property
                                    </th>

                                    {
                                        role === UserRole.LANDLORD ? (
                                            <th className="px-4 py-3 text-left">
                                                Requested by
                                            </th>
                                        ) : (
                                            <th className="px-4 py-3 text-left">
                                                Requested To
                                            </th>
                                        )
                                    }

                                    <th className="px-4 py-3 text-left">
                                        Request Status
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Action
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Payment Status
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Rental Status
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

                                {request.data.map((request: any) => (
                                    <tr
                                        key={request.id}
                                        className="border-b hover:bg-muted/40"
                                    >

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-3">

                                                <Image
                                                    src={request.property.thumbnail}
                                                    alt={request.property.location}
                                                    width={60}
                                                    height={60}
                                                    className="h-12 w-12 rounded-md object-cover"
                                                    unoptimized
                                                />

                                                <div className="min-w-45">

                                                    <p className="font-medium">
                                                        {request.property.location}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        House #{request.property.houseNo}
                                                        {" • "}
                                                        Road #{request.property.roadNo}
                                                    </p>

                                                    <p className="font-semibold">
                                                        ৳ {request.property.price.toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-4 py-4">

                                            {
                                                role === UserRole.LANDLORD ? (
                                                    <>
                                                        <p className="font-medium whitespace-nowrap">
                                                            {request.tenant.name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                                                            {request.tenant.email}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="font-medium whitespace-nowrap">
                                                            {request.property.landlord.name}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                                                            {request.property.landlord.email}
                                                        </p>
                                                    </>
                                                )
                                            }

                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    request.status === RequestStatus.ACCEPTED
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : request.status === RequestStatus.REJECTED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {request.status ?? "N/A"}
                                            </Badge>
                                        </td>

                                        {
                                            role === UserRole.LANDLORD && request.payment?.paymentStatus !== PaymentStatus.COMPLETED ? (
                                                <td className="px-4 py-4">
                                                    <RequestStatusButton request={request} />
                                                </td>
                                            ) : role === UserRole.TENANT && request.status === RequestStatus.ACCEPTED &&
                                                request.property?.status === PropertyStatus.AVAILABLE &&
                                                request.payment?.rentalStatus !== RentalStatus.EXPIRED &&
                                                request.payment?.rentalStatus !== RentalStatus.CANCELED ? (
                                                <td className="px-4 py-4">
                                                    <RentNowButton request={request} />
                                                </td>
                                            ) : (
                                                <td className="px-4 py-4 whitespace-nowrap flex justify-center"> </td>
                                            )
                                        }

                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    request.payment?.paymentStatus === PaymentStatus.COMPLETED
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : request.payment?.paymentStatus === PaymentStatus.FAILED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {request.payment?.paymentStatus ?? "N/A"}
                                            </Badge>
                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    request.payment?.rentalStatus === RentalStatus.ACTIVE
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : request.payment?.rentalStatus === RentalStatus.EXPIRED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {request.payment?.rentalStatus ?? "N/A"}
                                            </Badge>
                                        </td>

                                        {
                                            request.payment?.updatedAt ? (
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    {new Date(
                                                        request.payment.updatedAt
                                                    ).toLocaleDateString()}
                                                </td>
                                            ) : (
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    {new Date(
                                                        request.updatedAt
                                                    ).toLocaleDateString()}
                                                </td>
                                            )
                                        }

                                        {
                                            request.payment?.currentPeriodEnd ? (
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    {new Date(
                                                        request.payment?.currentPeriodEnd
                                                    ).toLocaleDateString()}
                                                </td>
                                            ) : (
                                                <td className="px-4 py-4 whitespace-nowrap flex justify-center">
                                                    ---
                                                </td>
                                            )
                                        }

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