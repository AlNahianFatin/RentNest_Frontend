import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropertiesSkeleton() {
    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {[1, 2, 3].map((item) => (
                    <Card key={item}>
                        <CardContent className="flex items-center gap-4 p-5">

                            {/* Icon */}
                            <Skeleton className="h-12 w-12 rounded-full" />

                            <div className="space-y-2">
                                {/* Title */}
                                <Skeleton className="h-4 w-32" />

                                {/* Number */}
                                <Skeleton className="h-8 w-16" />

                                {/* Description */}
                                <Skeleton className="h-3 w-40" />
                            </div>

                        </CardContent>
                    </Card>
                ))}

            </div>


            {/* Property Cards Skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {[1, 2, 3, 4, 5, 6].map((item) => (

                    <Card
                        key={item}
                        className="gap-4 overflow-hidden"
                    >

                        {/* Image */}
                        <Skeleton className="h-52 w-full rounded-none" />


                        <CardHeader className="space-y-3">

                            {/* Badges */}
                            <div className="flex gap-2">

                                <Skeleton className="h-6 w-24 rounded-full" />

                                <Skeleton className="h-6 w-20 rounded-full" />

                            </div>


                            {/* Location */}
                            <Skeleton className="h-6 w-40" />

                        </CardHeader>


                        <CardContent className="space-y-4">


                            {/* House */}
                            <Skeleton className="h-4 w-32" />


                            {/* Road */}
                            <Skeleton className="h-4 w-28" />


                            {/* Rent */}
                            <Skeleton className="h-4 w-36" />


                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2">

                                {/* Landlord + Date */}
                                <div className="space-y-2">

                                    <Skeleton className="h-3 w-36" />

                                    <Skeleton className="h-3 w-24" />

                                </div>


                                {/* Rating + Reviews */}
                                <div className="flex gap-3">

                                    <Skeleton className="h-4 w-16" />

                                    <Skeleton className="h-4 w-10" />

                                </div>

                            </div>


                        </CardContent>

                    </Card>

                ))}

            </div>

        </div>
    );
}