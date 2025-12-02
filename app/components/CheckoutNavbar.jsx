import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";

const CheckoutNavbar = () => {
  return (
    <nav className="p-4 sm:p-6 border-b border-neutral-200">
      <Link href={"/"}>
        <Image src={logo} alt="Airbnb logo" width={100} className="w-20 sm:w-24 md:w-[100px]" />
      </Link>
    </nav>
  );
};

export default CheckoutNavbar;
