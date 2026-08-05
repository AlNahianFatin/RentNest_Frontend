"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout } from "@/service/logout";
import { LayoutDashboard, LogOut, User, UserRoundKey } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import RentNestLogo from "./RentNestLogo";
import { UserRole, type NavbarProps } from "@/lib/types";
import { ProfileFormDialog } from "@/app/(dashboardGroup)/_components/profile/ProfileFormDialog";
import { useState } from "react";
import { UpdatePasswordFormDialog } from "@/app/(dashboardGroup)/_components/updatePassword/UpdatePasswordFormDialog";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
];

const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Change Password", icon: UserRoundKey, action: "updatePassword" }
];

export function Navbar({ user }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);

  const router = useRouter()
  const handleUserMenuAction = async (action: string) => {

    if (action === "dashboard") {
      if (user.data.role === UserRole.TENANT)
        router.push("/tenant-dashboard");
      else if (user.data.role === UserRole.LANDLORD)
        router.push("/landlord-dashboard");
      else if (user.data.role === UserRole.ADMIN)
        router.push("/admin-dashboard");
      else
        toast.error("Oops! Something went wrong");

      return;
    }

    if (action === "profile") {
      setProfileOpen(true);
      return;
    }

    if (action === "updatePassword") {
      setUpdatePasswordOpen(true);
      return;
    }

    if (action === "logout") {
      await Logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <RentNestLogo />
            <span className="text-2xl font-bold text-primary">
              Rent Nest
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Dropdown */}
          {
            user.success ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">
                          {user.data?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.data?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownMenuItem
                          key={item.action}
                          onClick={() => handleUserMenuAction(item.action)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={async () => {
                      await handleUserMenuAction("logout");
                    }}>
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ProfileFormDialog
                  open={profileOpen}
                  setOpen={setProfileOpen}
                  profile={{
                    id: user.data.id,
                    name: user.data.name,
                  }} />

                <UpdatePasswordFormDialog
                  open={updatePasswordOpen}
                  setOpen={setUpdatePasswordOpen}
                  user={{ id: user.data.id }} />
              </>
            ) : <Link href={"/login"} >
              <Button className="cursor-pointer">
                Login
              </Button>
            </Link>
          }
        </div>
      </div>
    </nav>
  );
}