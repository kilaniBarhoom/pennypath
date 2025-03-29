"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/ui/user-avatar";
import useMediaQuery from "@/hooks/use-media-query";
import { ny } from "@/lib/utils";
import { useAuth, useLogout } from "@/providers/auth-provider";
import { useSideBarTrigger } from "@/providers/sidebar-trigger.provider";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function NavUser() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { isSideBarOpen } = useSideBarTrigger();
  const isDesktop = useMediaQuery(1024);

  const logout = useLogout();

  const handleLogout = async () => {
    const isConfirmed = confirm(t("Are you sure you want to logout?"));

    if (isConfirmed) {
      queryClient.removeQueries();
      await logout();
      navigate("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={ny(buttonVariants({ variant: "outline" }), "px-2 w-full")}
      >
        {isSideBarOpen || !isDesktop ? (
          <>
            <UserAvatar
              image=""
              name={user?.fullNameEnglish}
              className="p-0"
              imageClassName="bg-muted"
              nameClassName="max-w-40 overflow-hidden text-elipsis whitespace-nowrap"
            />
            <ChevronsUpDown className="ml-auto size-4" />
          </>
        ) : (
          <Avatar className={ny("size-7")}>
            <AvatarImage src={""} alt={user?.fullNameEnglish} />
            <AvatarFallback className="bg-muted">
              {user?.fullNameEnglish?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isDesktop ? "right" : "bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={""} alt={user?.fullNameEnglish} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user?.fullNameEnglish}
              </span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          {t("Log Out")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
