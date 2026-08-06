import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { IProperty, UserRole } from "@/lib/types";
import { MessageSquareIcon, CircleCheck, CircleX, Star } from "lucide-react";
import Image from "next/image";

type RentsCardProps = {
    rent: IProperty;
    role?: UserRole;
};

export function MyRentsCard({ rent, role }: RentsCardProps) {
    const reviewCount = rent.reviews?.length ?? 0;

    return (

        <Card className="gap-4 hover:shadow-lg transition-shadow flex flex-col">
            <>
                {
                    rent.thumbnail && (
                        <Image
                            src={rent.thumbnail}
                            unoptimized
                            alt={rent.location}
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
                            rent.status === "AVAILABLE" ? (
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
                            {rent.type.propertyType}
                        </Badge>
                    </div>

                    <CardTitle className="text-lg">
                        {rent.location}
                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-3">
                    <p className="text-muted-foreground">
                        House # {rent.houseNo}
                    </p>


                    <p className="text-muted-foreground">
                        Road # {rent.roadNo}
                    </p>


                    <p className="text-muted-foreground">
                        Rent ৳ {rent.price}
                    </p>


                    <div className="space-y-2 text-xs text-muted-foreground">

                        {
                            role !== UserRole.LANDLORD && (
                                <div>
                                    Property of{" - "}
                                    {rent.landlord?.name ?? "Unknown"}
                                    {" · "}
                                    {new Date(rent.createdAt).toLocaleDateString()}
                                </div>
                            )
                        }

                        <div>
                            Rent Expires on{" "}
                            {
                                new Date(
                                    rent.rentalRequests[0]
                                        .payment!
                                        .currentPeriodEnd
                                ).toLocaleDateString()
                            }
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-xs">
                                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                                {
                                    Number(rent.averageRating)
                                        .toFixed(2)
                                }
                                /5
                            </span>

                            <span className="flex items-center gap-1 text-xs">
                                <MessageSquareIcon className="size-3.5" />
                                {reviewCount}
                            </span>
                        </div>
                    </div>

                </CardContent>
            </>

        </Card>
    );
}