import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PropertySkeleton() {
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <Card>

                {/* Image */}
                <Skeleton className="w-full h-112.5 rounded-t-xl" />

                <CardHeader className="space-y-5">

                    {/* Badges */}
                    <div className="flex gap-2">
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                    </div>

                    {/* Title */}
                    <Skeleton className="h-10 w-72" />

                    {/* Rating */}
                    <div className="flex gap-8">
                        <Skeleton className="h-6 w-28" />
                        <Skeleton className="h-6 w-32" />
                    </div>

                    {/* Button */}
                    <Skeleton className="h-11 w-40 rounded-md" />

                </CardHeader>

                <CardContent className="space-y-8">

                    {/* Property Info */}
                    <div className="grid grid-cols-2 gap-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                        ))}
                    </div>

                    <Skeleton className="h-px w-full" />

                    {/* Reviews */}
                    <div className="space-y-5">

                        <Skeleton className="h-8 w-52" />

                        {Array.from({ length: 3 }).map((_, i) => (
                            <Card key={i}>
                                <CardContent className="pt-5 space-y-4">

                                    <div className="flex justify-between">
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-48" />
                                        </div>

                                        <Skeleton className="h-7 w-16 rounded-full" />
                                    </div>

                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/5" />

                                </CardContent>
                            </Card>
                        ))}

                    </div>

                </CardContent>
            </Card>
        </div>
    );
}