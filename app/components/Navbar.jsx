import Image from "next/image";
import logo from "../../public/logo.png";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { Globe } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AuthProfile from "./AuthProfile";

function Navbar() {
  return (
    <div className=" container">
      <div className=" flex py-6">
        <div className=" flex-1 flex items-center">
          <Image src={logo} alt="Airbnb logo" width={100} />
        </div>
        <NavLinks />
        <div className="flex-1">
          <div className="ml-auto flex items-center max-w-max">
            <Link
              href={"#"}
              className="hover:rounded-full hover:bg-gray-50 transition-colors  duration-100 p-3 text-black font-normal"
            >
              Airbnb your home
            </Link>

            <Link
              href={"#"}
              className="hover:rounded-full hover:bg-gray-50 transition-colors  duration-100 p-3 text-black font-base mx-1"
            >
              <Globe className="w-5 h-5 font-light" />
            </Link>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <AuthProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
