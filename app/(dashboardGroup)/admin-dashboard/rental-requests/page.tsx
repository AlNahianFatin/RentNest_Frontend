// import { Suspense } from "react";
// import { AllPropertiesSkeleton } from "../../_components/properties/AllPropertiesSkeleton";
// import { AllPropertiesList } from "../../_components/properties/AllPropertiesList";
// import { PropertySearchBar } from "@/components/shared/PropertySearchBar";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

// const RentalRequestsPage = async () => {

//     const rentals = await getRentalRequests();

//     return (
//         //     <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
//         //         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         //             <div>
//         //                 <h1 className="text-2xl font-semibold">Properties</h1>
//         //                 {/* <p className="text-sm text-muted-foreground">
//         //                     Browse the available properties to rent.
//         //                 </p> */}
//         //             </div>

//         //             <PropertySearchBar />
//         //         </div>

//         //         <Suspense fallback={<AllPropertiesSkeleton />}>
//         //             <AllPropertiesList />
//         //         </Suspense>
//         //     </div>
//         // );


//         <Card className="overflow-hidden">
//             <div className="flex">

//                 {/* Property Image */}
//                 <Image
//                     src={rental.property.thumbnail}
//                     alt={rental.property.location}
//                     width={220}
//                     height={180}
//                     className="h-48 w-64 object-cover"
//                     unoptimized
//                 />

//                 <div className="flex-1 p-6">

//                     <div className="flex items-start justify-between">

//                         <div>
//                             <h2 className="text-xl font-semibold">
//                                 {rental.property.location}
//                             </h2>

//                             <p className="text-muted-foreground">
//                                 House #{rental.property.houseNo} • Road #{rental.property.roadNo}
//                             </p>

//                             <p className="mt-2 text-lg font-bold text-primary">
//                                 ৳ {rental.property.price.toLocaleString()} / month
//                             </p>
//                         </div>

//                         <Badge>
//                             {rental.property.status}
//                         </Badge>

//                     </div>

//                     <Separator className="my-5" />

//                     <div className="grid grid-cols-2 gap-6">

//                         <div>
//                             <p className="text-sm text-muted-foreground">
//                                 Tenant
//                             </p>

//                             <p className="font-medium">
//                                 {rental.tenant.name}
//                             </p>

//                             <p className="text-sm text-muted-foreground">
//                                 {rental.tenant.email}
//                             </p>
//                         </div>

//                         <div>
//                             <p className="text-sm text-muted-foreground">
//                                 Landlord
//                             </p>

//                             <p className="font-medium">
//                                 {rental.landlord.name}
//                             </p>

//                             <p className="text-sm text-muted-foreground">
//                                 {rental.landlord.email}
//                             </p>
//                         </div>

//                     </div>

//                     <div className="mt-6 flex flex-wrap gap-3">

//                         <Badge>
//                             Request: {rental.status}
//                         </Badge>

//                         <Badge variant="secondary">
//                             Payment: {rental.payment.paymentStatus}
//                         </Badge>

//                         <Badge variant="outline">
//                             Rental: {rental.payment.rentalStatus}
//                         </Badge>

//                     </div>

//                     <div className="mt-6 flex items-center justify-between">

//                         <p className="text-sm text-muted-foreground">
//                             Requested on{" "}
//                             {new Date(rental.createdAt).toLocaleDateString()}
//                         </p>

//                     </div>

//                 </div>

//             </div>
//         </Card>
//     )
// };

// export default RentalRequestsPage;


import { Suspense } from "react";
import { RentalRequestsSkeleton } from "../../_components/rentalRequests/RentalRequestsSkeleton";
import { RentalRequestsList } from "../../_components/rentalRequests/RentalRequestsList";

const RentalRequestsPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Rental Requests</h1>
                </div>

            </div>

            <Suspense fallback={<RentalRequestsSkeleton />}>
                <RentalRequestsList />
            </Suspense>
        </div>
    );
};

export default RentalRequestsPage;