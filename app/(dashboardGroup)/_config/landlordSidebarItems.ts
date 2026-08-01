import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, ScrollText, MapPinHouse } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/landlord-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Properties",
        href: "/landlord-dashboard/my-properties",
        icon: MapPinHouse
    },
    {
        label: "My Rentals",
        href: "/landlord-dashboard/my-rentals",
        icon: FileText
    },
    {
        label: "Rental Requests",
        href: "/landlord-dashboard/my-rental-requests",
        icon: ScrollText
    },
]