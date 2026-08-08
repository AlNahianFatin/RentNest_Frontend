import { getMyRentalRecords } from "../../_actions/rentsActions";
import { Ban, MapPinHouse, RotateCwFadingClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus, RentalStatus, ReviewStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DeleteReviewButton } from "../reviews/DeleteReviewButton";
import { EditReviewButton } from "../reviews/EditReviewButton";
import { PostReviewButton } from "../reviews/PostReviewButton";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function MyRentalRecordsList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;

    const rental = await getMyRentalRecords({ query });

    if (!rental.success || !rental.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No renal record found at the moment!
            </p>
        );
    }

    const stats = [
        {
            title: "Current Rentals",
            value: rental.meta.totalCurrentRecordCount,
            icon: RotateCwFadingClock,
            description: "Currently rented properties",
        },
        {
            title: "Total Rentals",
            value: rental.meta.totalRecordCount,
            icon: MapPinHouse,
            description: "Total rented properties",
        }
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 gap-x-50 gap-y-6 md:grid-cols-2">

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

                                    <th className="px-4 py-3 text-center"> Property </th>

                                    <th className="px-4 py-3 text-center"> Landlord </th>

                                    <th className="px-4 py-3 text-center"> Payment Status </th>

                                    <th className="px-4 py-3 text-center"> Rental Status </th>

                                    <th className="px-4 py-3 text-center"> Rented On </th>

                                    <th className="px-4 py-3 text-center"> Rental Expires </th>

                                    <th className="px-4 py-3 text-center"> Review </th>

                                </tr>
                            </thead>

                            <tbody>

                                {rental.data.map((rental: any) => (
                                    <tr key={rental.rentalRequest.property?.id} className="border-b hover:bg-muted/40" >

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={rental.rentalRequest.property?.thumbnail}
                                                    alt={rental.rentalRequest.property?.location}
                                                    width={60}
                                                    height={60}
                                                    className="h-22 w-25 rounded-md object-cover"
                                                    unoptimized
                                                    loading="eager"
                                                />

                                                <div className="min-w-55">

                                                    <p className="font-medium"> {rental.rentalRequest.property?.location} </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        House #{rental.rentalRequest.property?.houseNo}
                                                        {" • "}
                                                        Road #{rental.rentalRequest.property?.roadNo}
                                                    </p>

                                                    <p className="font-semibold">
                                                        ৳ {rental.rentalRequest.property.price.toLocaleString()}
                                                    </p>

                                                </div>
                                            </div>

                                        </td>

                                        <td className="px-4 py-4">

                                            <p className="font-medium whitespace-nowrap"> {rental.rentalRequest.landlord.name} </p>

                                            <p className="text-xs text-muted-foreground whitespace-nowrap"> {rental.rentalRequest.landlord.email} </p>

                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    rental.paymentStatus === PaymentStatus.COMPLETED
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : rental.status === PaymentStatus.FAILED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {rental.paymentStatus ?? "N/A"}
                                            </Badge>
                                        </td>

                                        <td className="px-4 py-4">
                                            <Badge
                                                className={
                                                    rental.rentalStatus === RentalStatus.ACTIVE
                                                        ? "bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300"
                                                        : rental.rentalStatus === RentalStatus.CANCELED
                                                            ? "bg-red-400 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                            : "bg-amber-700 text-gray-100 dark:bg-amber-950 dark:text-gray-100"
                                                }
                                            >
                                                {rental.rentalStatus ?? "N/A"}
                                            </Badge>
                                        </td>

                                        {rental.updatedAt && (<td className="px-4 py-4 whitespace-nowrap">

                                            {new Date(
                                                rental.updatedAt
                                            ).toLocaleDateString()}

                                        </td>)}

                                        {rental.currentPeriodEnd && (<td className="px-4 py-4 whitespace-nowrap">

                                            {new Date(
                                                rental.currentPeriodEnd
                                            ).toLocaleDateString()}

                                        </td>)}

                                        {
                                            rental.paymentStatus === PaymentStatus.COMPLETED ? (

                                                rental?.rentalRequest?.property?.reviews?.[0] &&
                                                    rental?.rentalRequest?.property?.reviews?.[0]?.status !== ReviewStatus.REJECTED ? (

                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex gap-2">

                                                            <EditReviewButton
                                                                review={rental.rentalRequest.property.reviews[0]}
                                                            />

                                                            <DeleteReviewButton
                                                                review={rental.rentalRequest.property.reviews[0]}
                                                            />

                                                        </div>
                                                    </td>

                                                ) : (

                                                    <td className="px-4 py-4 whitespace-nowrap">

                                                        <PostReviewButton
                                                            propertyId={rental.rentalRequest.propertyId}
                                                        />

                                                    </td>

                                                )

                                            ) : (

                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <Button disabled variant="destructive">
                                                        <Ban />
                                                        Blocked
                                                    </Button>
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