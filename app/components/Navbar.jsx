import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { Globe } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import AuthProfile from "./AuthProfile";
import NavBarSeparator from "./NavBarSeparator";
import MobileNavbar from "./MobileNavbar";

function Navbar({ children }) {
  return (
    <>
      <nav className="px-4 sm:px-6">
        <div className="flex py-3 sm:py-4">
          <div className="flex-1 flex items-center">
            <Link href={"/"}>
              <Image src={logo} alt="Airbnb logo" width={100} className="w-20 sm:w-24 md:w-[100px]" />
            </Link>
          </div>
          <>{children}</>
          <div className="flex-1">
            <div className="ml-auto flex items-center max-w-max">
              <Link
                href={"#"}
                className="hover:rounded-full hover:bg-neutral-50 transition-colors duration-100 p-3 text-black/90 font-normal hidden md:block"
              >
                Airbnb your home
              </Link>

              <Link
                href={"#"}
                className="hover:rounded-full hover:bg-neutral-50 transition-colors duration-100 p-3 text-black/90 font-base mx-1 hidden md:block"
              >
                <Globe className="w-5 h-5 font-light" />
              </Link>

              <SignedIn>
                <div className="hidden md:block">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <div className="hidden md:block">
                <AuthProfile />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <NavBarSeparator />
      <MobileNavbar />
    </>
  );
}

export default Navbar;
