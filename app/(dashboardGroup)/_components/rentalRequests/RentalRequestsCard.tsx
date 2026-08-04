import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProperty } from "@/lib/types";
import { MessageSquareIcon, CircleCheck, CircleX, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
    property: IProperty
}

export function RentalRequestsCard({ property }: PropertyCardProps) {
    const reviewCount = property.reviews?.length ?? 0;

    return (
        <Link href={`/admin-dashboard/properties/${property.id}`}>
            <Card className="gap-4 cursor-pointer hover:shadow-lg transition-shadow">
                {property.thumbnail && (
                    <Image
                        src={property.thumbnail}
                        unoptimized
                        alt={property.location}
                        width={400}
                        height={400}
                        loading="eager"
                    />
                )}
                <CardHeader>
                    <div className="flex flex-wrap items-center gap-1.5">

                        {property.status === "AVAILABLE" ? (
                            <Badge className="bg-green-600">
                                <CircleCheck className="w-4 h-4 mr-1" />
                                Available
                            </Badge>
                        ) : (
                            <Badge variant="destructive">
                                <CircleX className="w-4 h-4 mr-1" />
                                Rented
                            </Badge>
                        )}

                        <Badge key={property.type.propertyType}>
                            {property.type.propertyType}
                        </Badge>

                    </div>

                    <CardTitle className="text-lg">{property.location}</CardTitle>

                </CardHeader>

                <CardContent className="space-y-3">
                    <p className="line-clamp-4 whitespace-pre-line text-muted-foreground">
                        House # {property.houseNo}
                    </p>

                    <p className="line-clamp-4 whitespace-pre-line text-muted-foreground">
                        Road # {property.roadNo}
                    </p>

                    <p className="line-clamp-4 whitespace-pre-line text-muted-foreground">
                        Rent ৳ {property.price}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">

                        <span>
                            Posted By {property.landlord?.name ?? "Unknown"} ·{" "}
                            {new Date(property.createdAt).toLocaleDateString()}
                        </span>

                        {/* <span className="flex items-center gap-1">
                            <MessageSquareIcon className="size-3.5" />
                            {reviewCount}
                        </span> */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">

                            <span className="flex items-center gap-1">
                                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                                {Number(property.averageRating).toFixed(2) ?? "0"} / 5
                            </span>

                            <span className="flex items-center gap-1">
                                <MessageSquareIcon className="size-3.5" />
                                {reviewCount}
                            </span>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}