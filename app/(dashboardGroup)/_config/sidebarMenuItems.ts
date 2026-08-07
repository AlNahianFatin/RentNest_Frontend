import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard, ScrollText, ClipboardClock } from "lucide-react"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems"
import { LANDLORD_SIDEBAR_ITEMS } from "./landlordSidebarItems"


const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/tenant-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Rents",
        href: "/tenant-dashboard/my-rents",
        icon: FileText
    },
    {
        label: "My Rental Requests",
        href: "/tenant-dashboard/my-rental-requests",
        icon: ScrollText
    },
    {
        label: "My Rental Records",
        href: "/tenant-dashboard/my-rental-records",
        icon: ClipboardClock
    }
]


export const sidebarMenuItems = {
    TENANT: TENANT_SIDEBAR_ITEMS,
    LANDLORD: LANDLORD_SIDEBAR_ITEMS,
    ADMIN: ADMIN_SIDEBAR_ITEMS
}