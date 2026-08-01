import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, ClipboardType, UsersRound, ScrollText } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Rental Categories",
        href: "/admin-dashboard/categories",
        icon: ClipboardType
    },
    {
        label: "All Poperties",
        href: "/admin-dashboard/properties",
        icon: FileText
    },
    {
        label: "All Rental Requests",
        href: "/admin-dashboard/rental-requests",
        icon: ScrollText
    },
    {
        label: "Users",
        href: "/admin-dashboard/users",
        icon: UsersRound
    },
]