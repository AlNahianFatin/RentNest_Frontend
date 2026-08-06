import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MyRentsSkeleton() {
    return (
        <div className="space-y-6">

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 gap-x-50 gap-y-6 md:grid-cols-2">

                {[1, 2].map((item) => (
                    <Card key={item}>
                        <CardContent className="flex items-center gap-4 p-5">

                            <Skeleton className="h-12 w-12 rounded-full" />

                            <div className="space-y-2">

                                <Skeleton className="h-4 w-28" />

                                <Skeleton className="h-8 w-24" />

                                <Skeleton className="h-3 w-40" />

                            </div>

                        </CardContent>
                    </Card>
                ))}

            </div>


            {/* Rent Cards Skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {[1, 2, 3, 4, 5, 6].map((item) => (

                    <Card
                        key={item}
                        className="gap-4 flex flex-col"
                    >

                        {/* Image */}
                        <Skeleton className="mx-3 mt-3 h-60 rounded-md" />


                        {/* Header */}
                        <div className="px-6 space-y-3">

                            <div className="flex gap-2">

                                <Skeleton className="h-6 w-24 rounded-full" />

                                <Skeleton className="h-6 w-20 rounded-full" />

                            </div>


                            <Skeleton className="h-6 w-44" />

                        </div>


                        {/* Content */}
                        <CardContent className="space-y-4">

                            <Skeleton className="h-4 w-32" />

                            <Skeleton className="h-4 w-28" />

                            <Skeleton className="h-4 w-36" />


                            <div className="space-y-2 pt-2">

                                <Skeleton className="h-3 w-48" />

                                <Skeleton className="h-3 w-44" />

                            </div>


                            {/* Rating and Review */}
                            <div className="flex justify-between pt-2">

                                <Skeleton className="h-4 w-16" />

                                <Skeleton className="h-4 w-12" />

                            </div>


                        </CardContent>

                    </Card>

                ))}

            </div>

        </div>
    );
}