import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard } from "lucide-react"
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
        href: "/tenants-dashboard/my-rents",
        icon: FileText
    },
]


export const sidebarMenuItems = {
    TENANT: TENANT_SIDEBAR_ITEMS,
    LANDLORD: LANDLORD_SIDEBAR_ITEMS,
    ADMIN: ADMIN_SIDEBAR_ITEMS
}