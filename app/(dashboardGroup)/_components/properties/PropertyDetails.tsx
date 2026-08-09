import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPropertyById } from "../../_actions/propertiesActions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, MessageSquareIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IReview, ReviewStatus, UserRole } from "@/lib/types";
import RentNowButton from "@/components/shared/RentNowButton"
import { ManageReviewStatusButton } from "../reviews/ManageReviewStatusButton";

export default async function PropertyDetails({
    params,
    role
}: {
    params: Promise<{ id: string }>;
    role?: UserRole;
}) {
    const { id } = await params;

    const result = await getPropertyById(id, role);

    const property = result.data;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">

            <Card>

                {property.thumbnail && (
                    <Image
                        src={property.thumbnail}
                        alt={property.location}
                        width={1200}
                        height={700}
                        className="w-full h-112.5 object-cover rounded-t-xl"
                        unoptimized
                        loading="eager"
                    />
                )}

                <CardHeader className="space-y-3">

                    <div className="flex gap-2">

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

                        <Badge>
                            {property.type.propertyType}
                        </Badge>

                    </div>

                    <h1 className="text-3xl font-bold">
                        {property.location}
                    </h1>

                    <div className="flex items-center gap-6 text-muted-foreground">

                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                                {Number(property.averageRating).toFixed(2) ?? "0"} / 5
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MessageSquareIcon className="w-5 h-5" />
                            <span>
                                {property.reviews.length} Reviews
                            </span>
                        </div>

                    </div>

                    {
                        role !== UserRole.ADMIN &&
                        role !== UserRole.LANDLORD && (
                            <div className="flex gap-3 pt-2">
                                {property.status === "AVAILABLE" ? (
                                    <RentNowButton propertyId={property.id} />
                                ) : (
                                    <Button
                                        size="lg"
                                        disabled
                                        variant="secondary"
                                        className="w-full sm:w-auto"
                                    >
                                        Already Rented
                                    </Button>
                                )}
                            </div>
                        )
                    }

                </CardHeader>

                <CardContent className="space-y-8">

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <h3 className="font-semibold">
                                House No
                            </h3>

                            <p>{property.houseNo}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Road No
                            </h3>

                            <p>{property.roadNo}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Posted On
                            </h3>

                            <p>
                                {new Date(property.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Landlord
                            </h3>

                            <p>{property.landlord.name}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Email
                            </h3>

                            <p>{property.landlord.email}</p>
                        </div>

                    </div>

                    <hr />

                    <div>

                        <h2 className="text-2xl font-semibold mb-5">
                            Reviews ({property.reviews.length})
                        </h2>

                        {property.reviews.length === 0 ? (
                            <p>No reviews yet.</p>
                        ) : (
                            <div className="space-y-5">

                                {/* {property.reviews.map((review: IReview) => (
                                    <Card key={review.id}>
                                        <CardContent className="pt-5">

                                            <div className="flex justify-between">

                                                <div
                                                    className={
                                                        review.status === "REJECTED"
                                                            ? "opacity-50 grayscale"
                                                            : ""
                                                    }
                                                >

                                                    <div>
                                                        <p className="font-semibold">
                                                            {review.reviewer.name}
                                                        </p>

                                                        <p className="text-sm text-muted-foreground">
                                                            {review.reviewer.email}
                                                        </p>
                                                    </div>

                                                    <Badge>
                                                        ⭐ {review.rating}/5
                                                    </Badge>
                                                </div>

                                            </div>

                                            {review.comment && (
                                                <p className="mt-4">
                                                    {review.comment}
                                                </p>
                                            )}

                                            {review.status === ReviewStatus.REJECTED ? (
                                                <Badge variant={"destructive"} className="mt-4">
                                                    {review.status}
                                                </Badge>
                                            ) : <Badge className="mt-4">
                                                {review.status}
                                            </Badge>
                                            }


                                            <ManageReviewStatusButton review={review} />

                                        </CardContent>
                                    </Card>
                                ))} */}

                                {property.reviews.map((review: IReview) => (
                                    <Card
                                        key={review.id}
                                        className={
                                            review.status === ReviewStatus.REJECTED
                                                ? "border-destructive/30 bg-muted/50"
                                                : ""
                                        }
                                    >
                                        <CardContent className="pt-6 space-y-4">

                                            {/* Header */}
                                            <div className="flex items-start justify-between">

                                                <div className="flex gap-3">

                                                    <div className={
                                                        review.status === ReviewStatus.REJECTED
                                                            ? "opacity-50 grayscale"
                                                            : ""
                                                    } >
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                                                            {review.reviewer.name.charAt(0)}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold">
                                                                {review.reviewer.name}
                                                            </p>

                                                            <p className="text-sm text-muted-foreground">
                                                                {review.reviewer.email}
                                                            </p>
                                                        </div>

                                                    </div>


                                                    {/* <div>
                                                        <p className="font-semibold">
                                                            {review.reviewer.name}
                                                        </p>

                                                        <p className="text-sm text-muted-foreground">
                                                            {review.reviewer.email}
                                                        </p>
                                                    </div> */}

                                                </div>


                                                <Badge className={
                                                    review.status === ReviewStatus.REJECTED
                                                        ? "opacity-50 grayscale"
                                                        : ""
                                                }>
                                                    ⭐ {review.rating}/5
                                                </Badge>

                                            </div>

                                            {review.comment && (
                                                <p
                                                    className={
                                                        review.status === ReviewStatus.REJECTED
                                                            ? "text-muted-foreground italic"
                                                            : ""
                                                    }
                                                >
                                                    &quot;{review.comment}&quot;
                                                </p>
                                            )}


                                            {role === UserRole.ADMIN && (
                                                <div className="flex justify-between items-center">

                                                    {
                                                        review.status === ReviewStatus.REJECTED
                                                            ?
                                                            <Badge variant="destructive">
                                                                Hidden
                                                            </Badge>
                                                            :
                                                            <Badge className="bg-green-600">
                                                                Published
                                                            </Badge>
                                                    }

                                                    <ManageReviewStatusButton review={review} />

                                                </div>
                                            )}

                                        </CardContent>
                                    </Card>
                                ))}

                            </div>
                        )}

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}