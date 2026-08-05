import { getUsers } from "../../_actions/usersActions";
import { BanknoteArrowDown, BanknoteCheck, BanknoteX, ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserActiveStatus, UserRole } from "@/lib/types";
import UserStatusButton from "./UserStatusButton";

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function UsersList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;

    const result = await getUsers({ query });

    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No user found at the moment!
            </p>
        );
    }

    const stats = [
        {
            title: "Admins",
            value: result.meta.totalAdminCount,
            icon: BanknoteArrowDown,
            description: "Number of admins",
        },
        {
            title: "Landlords",
            value: result.meta.totalLandlordCount,
            icon: BanknoteArrowDown,
            description: "Number of landlords",
        },
        {
            title: "Tenants",
            value: result.meta.totalTenantCount,
            icon: BanknoteArrowDown,
            description: "Number of tenants",
        },
        {
            title: "Active Users",
            value: result.meta.totalActiveUsersCount,
            icon: BanknoteCheck,
            description: "Number of active users",
        },
        {
            title: "Banned Users",
            value: result.meta.totalBannedUsersCount,
            icon: BanknoteX,
            description: "Number of banned users",
        },
        {
            title: "Users",
            value: result.meta.totalUsersCount,
            icon: ScrollText,
            description: "Number of total users",
        },
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.title}>
                            <CardContent className="flex items-center gap-4 p-5">

                                <div className="rounded-full bg-primary/10 p-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>

                                    <p className="text-3xl font-bold">
                                        {stat.value}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>

                            </CardContent>
                        </Card>
                    );
                })}
            </div>


            <Card>

                <CardContent className="p-0">

                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-250 text-sm">

                            <thead className="border-b bg-muted/50">

                                <tr>

                                    <th className="px-4 py-3 text-left">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Email
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Role
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Account Created
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Account Status
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {result.data.map((user: any) => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-muted/40"
                                    >

                                        <td className="px-4 py-4">

                                            <p className="font-medium whitespace-nowrap">
                                                {user.name}
                                            </p>

                                        </td>

                                        <td className="px-4 py-4">

                                            <p className="font-medium whitespace-nowrap">
                                                {user.email}
                                            </p>

                                        </td>

                                        <td className="px-4 py-4">

                                            <Badge
                                                className={
                                                    user.role === UserRole.ADMIN
                                                        ? "bg-blue-200 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                                        : user.role === UserRole.LANDLORD
                                                            ? "bg-purple-200 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                                                            : "bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300"
                                                }
                                            >
                                                {user.role ?? "N/A"}
                                            </Badge>

                                        </td>

                                        <td className="px-4 py-4 whitespace-nowrap">

                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString()}

                                        </td>

                                        <td className="px-4 py-4 whitespace-nowrap">

                                            <Badge
                                                className={
                                                    user.status === UserActiveStatus.ACTIVE
                                                        ? "bg-green-200 text-green-700 dark:bg-green-950 dark:text-green-300"
                                                        : "bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-300"
                                                }
                                            >
                                                {user.status ?? "N/A"}
                                            </Badge>

                                        </td>

                                        <td className="px-4 py-4">

                                            <UserStatusButton user={user} />

                                        </td>

                                    </tr>))}

                            </tbody>


                        </table>

                    </div>

                </CardContent>

            </Card>

        </div>
    );
}