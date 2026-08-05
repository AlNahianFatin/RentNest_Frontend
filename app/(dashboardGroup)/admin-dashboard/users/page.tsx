import { Suspense } from "react";
import { UsersSkeleton } from "../../_components/users/UsersSkeleton";
import { UsersList } from "../../_components/users/UsersList";
import { SearchBar } from "@/components/shared/SearchBar";

const UsersPage = () => {
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <p className="text-sm text-muted-foreground"> Manage user account status. </p>
                </div>

                <div className="flex flex-col gap-3 items-end">
                    <SearchBar text="Search users..." />
                </div>
            </div>

            <Suspense fallback={<UsersSkeleton />}>
                <UsersList />
            </Suspense>
        </div>
    );
};

export default UsersPage;