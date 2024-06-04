import Link from "next/link";
import logo from "../../public/logo.png";
import Image from "next/image";

const CheckoutNavbar = () => {
  return (
    <nav className="p-6 border-b border-neutral-200">
      <Link href={"/"}>
        <Image src={logo} alt="Airbnb logo" width={100} />
      </Link>
    </nav>
  );
};

export default CheckoutNavbar;
