import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProperty, PropertyStatus } from "@/lib/types";
import { MessageSquareIcon, CircleCheck } from "lucide-react";
import Image from "next/image";

type PropertyCardProps = {
    property: IProperty
}

export function PropertyCard({ property }: PropertyCardProps) {
    const reviewCount = property.reviews?.length ?? 0;

    return (
        <Card className="gap-4">
            {property.thumbnail && (
                <Image
                    src={property.thumbnail}
                    unoptimized
                    alt={property.location}
                    width={400}
                    height={400}
                />
            )}
            <CardHeader>
                <div className="flex flex-wrap items-center gap-1.5">
                    {property.status && property.status === PropertyStatus.AVAILABLE && (
                        <Badge className="bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-300">
                            <CircleCheck data-icon="inline-start" />
                            Available
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
                    Rent {property.price} tk
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                        Posted By {property.landlord?.name ?? "Unknown"} ·{" "}
                        {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageSquareIcon className="size-3.5" />
                        {reviewCount}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}