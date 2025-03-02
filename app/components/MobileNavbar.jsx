"use client";

import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AuthProfile from "./AuthProfile";
import { useState } from "react";

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Icon at top right */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-white shadow-md"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col gap-6 p-6 mt-16">
          <Link
            href={"/"}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </Link>

          <Link
            href={"#"}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <Globe className="h-6 w-6" />
            <span>Explore</span>
          </Link>

          <Link
            href={"#"}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Airbnb your home</span>
          </Link>

          {/* Sign in section */}
          <div className="mt-auto border-t pt-4">
            <SignedIn>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                <UserButton afterSignOutUrl="/" />
                <span>Profile</span>
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md w-full"
                >
                  <AuthProfile />
                </button>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNavbar;
