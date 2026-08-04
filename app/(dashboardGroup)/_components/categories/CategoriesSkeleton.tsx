import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>

            <div className="flex items-start justify-between">

              <div className="space-y-3">

                {/* Property count badge */}
                <Skeleton className="h-6 w-28 rounded-full" />

                {/* Category title */}
                <Skeleton className="h-7 w-40" />

              </div>

              {/* Edit button */}
              <CardAction>
                <Skeleton className="h-9 w-20 rounded-md" />
              </CardAction>

            </div>

          </CardHeader>

          <CardContent>

            <div className="flex justify-between">

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="space-y-2 text-right">
                <Skeleton className="h-4 w-28 ml-auto" />
                <Skeleton className="h-4 w-32 ml-auto" />
              </div>

            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}