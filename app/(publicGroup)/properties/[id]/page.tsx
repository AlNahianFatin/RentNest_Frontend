// "use server"

// import { IProperty, IReview } from "@/lib/types"
// import { getPublicPropertyById } from "../../_actions/getPublicPropertyById";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardHeader,
// } from "@/components/ui/card";
// import { CircleCheck, CircleX, MessageSquareIcon, Star } from "lucide-react";
// import { toast } from "sonner";

// type Props = {
//     params: Promise<{
//         id: string;
//     }>;
// };

// export default async function PropertyDetailsPage({
//     params,
// }: Props) {
//     const { id } = await params;

//     const result = await getPublicPropertyById(id);

//     if (!result.success) {
//         toast("Oops! Something went wrong.");
//     }

//     const property: IProperty = result.data[0];

//     return (
//         <div className="max-w-6xl mx-auto py-10 px-4">

//             <Card>

//                 {property.thumbnail && (
//                     <Image
//                         src={property.thumbnail}
//                         alt={property.location}
//                         width={1200}
//                         height={700}
//                         className="w-full h-112.5 object-cover rounded-t-xl"
//                         unoptimized
//                         loading="eager"
//                     />
//                 )}

//                 <CardHeader className="space-y-3">

//                     <div className="flex gap-2">

//                         {property.status === "AVAILABLE" ? (
//                             <Badge className="bg-green-600">
//                                 <CircleCheck className="w-4 h-4 mr-1" />
//                                 Available
//                             </Badge>
//                         ) : (
//                             <Badge variant="destructive">
//                                 <CircleX className="w-4 h-4 mr-1" />
//                                 Rented
//                             </Badge>
//                         )}

//                         <Badge>
//                             {property.type.propertyType}
//                         </Badge>

//                     </div>

//                     <h1 className="text-3xl font-bold">
//                         {property.location}
//                     </h1>

//                     {/* <p className="text-2xl font-semibold text-primary">
//                         ৳ {property.price} / month
//                     </p> */}

//                     <div className="flex items-center gap-6 text-muted-foreground">

//                         <div className="flex items-center gap-2">
//                             <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                             <span className="font-medium">
//                                 {Number(property.averageRating).toFixed(2) ?? "0"} / 5
//                             </span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <MessageSquareIcon className="w-5 h-5" />
//                             <span>
//                                 {property.reviews.length} Reviews
//                             </span>
//                         </div>

//                     </div>

//                     <div className="flex gap-3 pt-2">
//                         {property.status === "AVAILABLE" ? (
//                             <Button
//                                 size="lg"
//                                 className="w-full sm:w-auto"
//                             >
//                                 Rent Now
//                             </Button>
//                         ) : (
//                             <Button
//                                 size="lg"
//                                 disabled
//                                 variant="secondary"
//                                 className="w-full sm:w-auto"
//                             >
//                                 Already Rented
//                             </Button>
//                         )}
//                     </div>

//                 </CardHeader>

//                 <CardContent className="space-y-8">

//                     <div className="grid grid-cols-2 gap-6">

//                         <div>
//                             <h3 className="font-semibold">
//                                 House No
//                             </h3>

//                             <p>{property.houseNo}</p>
//                         </div>

//                         <div>
//                             <h3 className="font-semibold">
//                                 Road No
//                             </h3>

//                             <p>{property.roadNo}</p>
//                         </div>

//                         <div>
//                             <h3 className="font-semibold">
//                                 Posted On
//                             </h3>

//                             <p>
//                                 {new Date(property.createdAt).toLocaleDateString()}
//                             </p>
//                         </div>

//                         <div>
//                             <h3 className="font-semibold">
//                                 Landlord
//                             </h3>

//                             <p>{property.landlord.name}</p>
//                         </div>

//                         <div>
//                             <h3 className="font-semibold">
//                                 Email
//                             </h3>

//                             <p>{property.landlord.email}</p>
//                         </div>

//                     </div>

//                     <hr />

//                     <div>

//                         <h2 className="text-2xl font-semibold mb-5">
//                             Reviews ({property.reviews.length})
//                         </h2>

//                         {property.reviews.length === 0 ? (
//                             <p>No reviews yet.</p>
//                         ) : (
//                             <div className="space-y-5">

//                                 {property.reviews.map((review: IReview) => (
//                                     <Card key={review.id}>
//                                         <CardContent className="pt-5">

//                                             <div className="flex justify-between">

//                                                 <div>
//                                                     <p className="font-semibold">
//                                                         {review.reviewer.name}
//                                                     </p>

//                                                     <p className="text-sm text-muted-foreground">
//                                                         {review.reviewer.email}
//                                                     </p>
//                                                 </div>

//                                                 <Badge>
//                                                     ⭐ {review.rating}/5
//                                                 </Badge>

//                                             </div>

//                                             {review.comment && (
//                                                 <p className="mt-4">
//                                                     {review.comment}
//                                                 </p>
//                                             )}

//                                         </CardContent>
//                                     </Card>
//                                 ))}

//                             </div>
//                         )}

//                     </div>

//                 </CardContent>

//             </Card>

//         </div>
//     );
// }



import { Suspense } from "react";
import { PropertySkeleton } from "../../_components/properties/PropertySkeleton";
import PublicPropertyDetails from "../../_components/properties/PublicPropertyDetails";

type Props = {
    params: Promise<{ id: string }>;
};

export default function PropertyDetailsPage({ params }: Props) {
    return (
        <Suspense fallback={<PropertySkeleton />}>
            <PublicPropertyDetails params={params} />
        </Suspense>
    );
}