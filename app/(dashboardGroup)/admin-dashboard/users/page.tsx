import { Suspense } from "react";
import { RentalRequestsSkeleton } from "../../_components/rentalRequests/RentalRequestsSkeleton";
import { UsersList } from "../../_components/users/UsersList";

const UsersPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Users</h1>
                </div>

            </div>

            <Suspense fallback={<RentalRequestsSkeleton />}>
                <UsersList />
            </Suspense>
        </div>
    );
};

export default UsersPage;