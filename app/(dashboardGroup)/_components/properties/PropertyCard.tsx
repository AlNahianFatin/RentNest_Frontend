import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { ICategory, IProperty, UserRole } from "@/lib/types";
import { MessageSquareIcon, CircleCheck, CircleX, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EditPropertyButton } from "./EditPropertyButton";
import { DeletePropertyButton } from "./DeletePropertyButton";


type PropertyCardProps = {
    property: IProperty;
    categories: ICategory[];
    role?: UserRole;
};


export function PropertyCard({
    property,
    categories,
    role
}: PropertyCardProps) {

    const reviewCount = property.reviews?.length ?? 0;

    const href =
        role === "ADMIN"
            ? `/admin-dashboard/properties/${property.id}`
            : role === "LANDLORD"
                ? `/landlord-dashboard/my-properties/${property.id}`
                : `/tenant-dashboard/properties/${property.id}`;



    return (

        <Card className="gap-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col">

            <Link href={href} className="block">

                <>
                    {
                        property.thumbnail && (
                            <Image
                                src={property.thumbnail}
                                unoptimized
                                alt={property.location}
                                width={400}
                                height={400}
                                loading="eager"
                                className="p-3"
                            />
                        )
                    }

                    <CardHeader>

                        <div className="flex flex-wrap items-center gap-1.5">
                            {
                                property.status === "AVAILABLE" ? (
                                    <Badge className="bg-green-600">
                                        <CircleCheck className="w-4 h-4 mr-1" />
                                        Available
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">
                                        <CircleX className="w-4 h-4 mr-1" />
                                        Rented
                                    </Badge>
                                )
                            }

                            <Badge>
                                {property.type.propertyType}
                            </Badge>
                        </div>

                        <CardTitle className="text-lg">
                            {property.location}
                        </CardTitle>

                    </CardHeader>

                    <CardContent className="space-y-3">
                        <p className="text-muted-foreground">
                            House # {property.houseNo}
                        </p>


                        <p className="text-muted-foreground">
                            Road # {property.roadNo}
                        </p>


                        <p className="text-muted-foreground">
                            Rent ৳ {property.price}
                        </p>


                        <div className="space-y-2 text-xs text-muted-foreground">

                            {
                                role !== UserRole.LANDLORD && (
                                    <div>
                                        Posted By{" "}
                                        {property.landlord?.name ?? "Unknown"}
                                        {" · "}
                                        {new Date(property.createdAt).toLocaleDateString()}
                                    </div>
                                )
                            }


                            {
                                (role === UserRole.ADMIN || role === UserRole.LANDLORD) &&
                                property.rentalRequests?.[0]?.tenant &&
                                property.rentalRequests?.[0]?.payment?.currentPeriodEnd && (

                                    <div>
                                        Rented By{" "}
                                        {property.rentalRequests[0].tenant.name}
                                        {" · "}
                                        Expires on{" "}
                                        {
                                            new Date(
                                                property.rentalRequests[0]
                                                    .payment!
                                                    .currentPeriodEnd
                                            ).toLocaleDateString()
                                        }
                                    </div>

                                )
                            }

                        </div>

                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-xs">
                                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                                {
                                    Number(property.averageRating)
                                        .toFixed(2)
                                }
                                /5
                            </span>

                            <span className="flex items-center gap-1 text-xs">
                                <MessageSquareIcon className="size-3.5" />
                                {reviewCount}
                            </span>
                        </div>

                    </CardContent>
                </>

            </Link>

            {
                role === UserRole.LANDLORD && (
                    <div className="flex justify-end px-4 pb-0 pt-2 mt-0">
                        <EditPropertyButton
                            property={property}
                            categories={categories}
                        />
                        <DeletePropertyButton
                            property={property}
                        // categories={categories}
                        />
                    </div>
                )
            }

        </Card>
    );
}