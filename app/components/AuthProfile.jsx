"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SignedOut } from "@clerk/nextjs";
import { CircleUserRound, Menu } from "lucide-react";
import Link from "next/link";

const AuthProfile = () => {
  return (
    <SignedOut>
      <div className="flex p-3 rounded-full border z-20 border-gray-400">
        <DropdownMenu>
          <DropdownMenuTrigger className=" focus:outline-none focus:ring-0">
            <div className="gap-2 flex items-center">
              <Menu className="w-5 h-5 text-gray-500" />
              <CircleUserRound className="w-7 h-7 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[250px] rounded-xl">
            <DropdownMenuItem className="font-semibold">
              <Link href={"/sign-up"}>Sign up</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-light mt-4">
              <Link href={"/sign-in"}>Log in</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-light mt-4">
              Gift card
            </DropdownMenuItem>
            <DropdownMenuItem className="font-light mt-4">
              Airbnb your home
            </DropdownMenuItem>
            <DropdownMenuItem className="font-light mt-4">
              Help center
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SignedOut>
  );
};

export default AuthProfile;
