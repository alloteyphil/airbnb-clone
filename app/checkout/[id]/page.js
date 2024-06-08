import CheckoutButton from "@/app/components/CheckoutButton";
import CheckoutNavbar from "@/app/components/CheckoutNavbar";
import ChevronLeftLink from "@/app/components/ChevronLeftLink";
import Separator from "@/app/components/Separator";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params, searchParams }) => {
  const { stay } = await getSingleStay(params.id);

  const nights =
    (new Date(searchParams.checkout).setHours(0, 0, 0, 0) -
      new Date(searchParams.checkin).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24) || 1;

  const price = stay.price;

  const totalPrice = price * nights;

  const serviceFee = totalPrice * 0.07;

  const totalServicePrice = totalPrice + serviceFee;

  return (
    <div className="flex flex-col min-h-screen">
      <CheckoutNavbar />
      <div className="max-w-6xl mx-auto py-16 flex-1">
        <div className="flex items-center">
          <ChevronLeftLink />
          <h1 className="text-black/90/90 text-3xl font-medium">
            Confirm and pay
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-20 pt-10">
          <div className="flex flex-col gap-8 pl-12">
            <div className="border rounded-2xl px-4 py-6 flex items-start pr-10 justify-between">
              <div className="flex flex-col gap-2 max-w-sm text-base">
                <p className="font-medium text-base">Good price</p>
                <p>
                  Your dates are less than the avg. nightly rate over the last 3
                  months.
                </p>
              </div>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: "block",
                  height: "32px",
                  width: "32px",
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                }}
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <g stroke="none">
                  <path d="M25.55 1a5 5 0 0 1 3.344 1.282l.192.182 17.207 17.208a3 3 0 0 1 .135 4.098l-.135.144-18.379 18.379a3.001 3.001 0 0 1-3.32.63l-6.42 3.81c-1.296.768-2.948.452-3.894-.736l-.115-.153-.118-.186L2.094 25.046a5 5 0 0 1-.53-3.7l3.435-14.01L5 6a5 5 0 0 1 4.783-4.995L10 1h15.55zM5 15.733l-1.494 6.09a3 3 0 0 0 .219 2.034l.1.186 11.93 20.574.07.112a1 1 0 0 0 1.328.283l5.797-3.441L6.464 25.086a5 5 0 0 1-1.457-3.272L5 21.55v-5.817zM25.55 3H10a3 3 0 0 0-2.995 2.824L7 6v15.55a3 3 0 0 0 .743 1.977l.136.144L25.086 40.88a1 1 0 0 0 1.32.083l.094-.083L44.88 22.5a1 1 0 0 0 .083-1.32l-.083-.094L27.67 3.879A3 3 0 0 0 25.55 3zM14 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                  <path
                    d="M25.556 5H10a1 1 0 0 0-.993.883L9 6v15.556a1 1 0 0 0 .206.608l.087.1 16.505 16.505 16.971-16.971L26.263 5.293a1 1 0 0 0-.575-.284L25.556 5z"
                    fillOpacity=".2"
                  ></path>
                </g>
              </svg>
            </div>
            <h3 className="text-xl font-medium">Your trip</h3>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-normal text-lg">Dates</p>
                <p>
                  {searchParams.checkin.split("/")[1] ===
                  searchParams.checkout.split("/")[1]
                    ? `${searchParams.checkin.split("/")[0]}-${
                        searchParams.checkout.split("/")[0]
                      } ${searchParams.checkout.split("/")[1]}`
                    : `${searchParams.checkin.split("/")[0]} ${
                        searchParams.checkin.split("/")[1]
                      }-${searchParams.checkout.split("/")[0]} ${
                        searchParams.checkout.split("/")[1]
                      }`}
                </p>
              </div>
              <p className="underline text-lg font-normal">Edit</p>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-normal text-lg">Guests</p>
                <p>
                  {parseInt(searchParams.adults) +
                    parseInt(searchParams.children)}{" "}
                  guest
                  {parseInt(searchParams.adults) +
                    parseInt(searchParams.children) ===
                  1
                    ? ""
                    : "s"}
                </p>
              </div>
              <p className="underline text-lg font-normal">Edit</p>
            </div>
            <Separator />
            <h3 className="text-xl font-medium">Pay by card</h3>
            <CheckoutButton
              stayId={stay._id}
              title={stay.title}
              price={price}
              nights={nights}
              startDate={searchParams.checkin}
              endDate={searchParams.checkout}
            />
          </div>
          <div>
            <div className="rounded-2xl w-full max-h-max border border-neutral-200 p-8">
              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <Image
                    src={`/${stay.images[0]}`}
                    alt={stay.title}
                    width={150}
                    height={200}
                    className="rounded-2xl h-28 w-28 object-cover object-center"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-lg">{stay.title}</p>
                    <p className="text-base">{stay.subtitle}</p>
                    <div className="flex items-center gap-1 text-base">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>{stay.ratings}</p>
                      <p className="font-medium">·</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        style={{
                          display: "block",
                          height: "12px",
                          width: "12px",
                          fill: "currentcolor",
                        }}
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                      >
                        <path d="m8.5 7.6 3.1-1.75 1.47-.82a.83.83 0 0 0 .43-.73V1.33a.83.83 0 0 0-.83-.83H3.33a.83.83 0 0 0-.83.83V4.3c0 .3.16.59.43.73l3 1.68 1.57.88c.35.2.65.2 1 0zm-.5.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"></path>
                      </svg>
                      <p>Superhost</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <h3 className="text-xl font-medium">Price details</h3>
                <div className="flex flex-col gap-4 font-light text-base">
                  <div className="flex justify-between">
                    <p className="">
                      ${stay.price.toFixed(2)} x {nights} night
                      {(nights < 1 || nights > 1) && "s"}
                    </p>
                    <p>
                      $
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                      }).format(totalPrice)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="underline decoration-1">Airbnb Service fee</p>
                    <p>
                      $
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                      }).format(serviceFee)}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="font-medium text-lg">Total(USD)</p>
                  <p className="font-medium text-lg">
                    $
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(totalServicePrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator isFooter={true} />
      <div className="w-full bg-footer mt-auto">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex justify-between items-center text-sm font-light py-8">
            <div className="flex gap-2">
              <p>© {new Date().getFullYear()} Airbnb, Inc.</p>
              <Link href={"#"}>
                · <span className="hover:underline">Terms</span>
              </Link>
              <Link href={"#"}>
                · <span className="hover:underline">Sitemap</span>
              </Link>
              <Link href={"#"}>
                · <span className="hover:underline">Privacy</span>
              </Link>
              <div className="flex gap-1 items-center">
                ·
                <Link href={"#"} className="hover:underline">
                  Your Privacy Choices
                </Link>
                <svg width="26" height="12" fill="none" className="ml-1">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="25"
                    height="11"
                    rx="5.5"
                    fill="#fff"
                  ></rect>
                  <path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path>
                  <path
                    d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5"
                    stroke="#06F"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5"
                    stroke="#fff"
                    strokeLinecap="round"
                  ></path>
                  <rect
                    x="0.5"
                    y="0.5"
                    width="25"
                    height="11"
                    rx="5.5"
                    stroke="#06F"
                  ></rect>
                </svg>
              </div>
            </div>
            <div className="flex gap-2 ">
              <Link href={"#"}>
                <Globe className="w-5 h-5 font-light" />
              </Link>
              <Link href={"#"}>
                <span className="hover:underline font-medium">
                  English (US)
                </span>
              </Link>
              <Link href={"#"}>
                <span className="font-medium pl-3">$</span>
                <span className="hover:underline font-medium"> USD</span>
              </Link>
              <div className="pl-6 flex gap-4">
                <Link href={"#"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-label="Navigate to Facebook"
                    role="img"
                    focusable="false"
                    className="w-5 h-5 font-light"
                  >
                    <path d="M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"></path>
                    <path
                      fill="#fff"
                      d="M22.94 16H18.5v-3c0-1.27.62-2.5 2.6-2.5h2.02V6.56s-1.83-.31-3.58-.31c-3.65 0-6.04 2.21-6.04 6.22V16H9.44v4.62h4.06V32h5V20.62h3.73z"
                    ></path>
                  </svg>
                </Link>
                <Link href={"#"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-label="Navigate to Twitter"
                    role="img"
                    focusable="false"
                    className="w-5 h-5 font-light"
                  >
                    <path d="M32 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4z"></path>
                    <path
                      fill="#fff"
                      d="M18.66 7.99a4.5 4.5 0 0 0-2.28 4.88A12.31 12.31 0 0 1 7.3 8.25a4.25 4.25 0 0 0 1.38 5.88c-.69 0-1.38-.13-2-.44a4.54 4.54 0 0 0 3.5 4.31 4.3 4.3 0 0 1-2 .06 4.64 4.64 0 0 0 4.19 3.13A8.33 8.33 0 0 1 5.8 23a12.44 12.44 0 0 0 19.32-11.19A7.72 7.72 0 0 0 27.3 9.5a8.3 8.3 0 0 1-2.5.75 4.7 4.7 0 0 0 2-2.5c-.87.5-1.81.87-2.81 1.06a4.5 4.5 0 0 0-5.34-.83z"
                    ></path>
                  </svg>
                </Link>
                <Link href={"#"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-label="Navigate to Instagram"
                    role="img"
                    focusable="false"
                    className="w-5 h-5 font-light"
                  >
                    <path d="M30 0H2a2 2 0 0 0-2 2v28c0 1.1.9 2 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <path
                      fill="#fff"
                      d="M15.71 4h1.25c2.4 0 2.85.02 3.99.07 1.28.06 2.15.26 2.91.56.79.3 1.46.72 2.13 1.38.6.6 1.08 1.33 1.38 2.13l.02.06c.28.74.48 1.58.54 2.8l.01.4c.05 1.02.06 1.63.06 4.4v.92c0 2.6-.02 3.05-.07 4.23a8.78 8.78 0 0 1-.56 2.91c-.3.8-.77 1.53-1.38 2.13a5.88 5.88 0 0 1-2.13 1.38l-.06.02c-.74.28-1.59.48-2.8.53l-.4.02c-1.02.05-1.63.06-4.4.06h-.92a73.1 73.1 0 0 1-4.23-.07 8.78 8.78 0 0 1-2.91-.56c-.8-.3-1.53-.77-2.13-1.38a5.88 5.88 0 0 1-1.38-2.13l-.02-.06a8.84 8.84 0 0 1-.54-2.8l-.01-.37A84.75 84.75 0 0 1 4 16.29v-1c0-2.62.02-3.06.07-4.24.06-1.26.26-2.13.55-2.88l.01-.03c.3-.8.77-1.53 1.38-2.13a5.88 5.88 0 0 1 2.13-1.38l.06-.02a8.84 8.84 0 0 1 2.8-.54l.37-.01C12.39 4 12.99 4 15.71 4zm.91 2.16h-1.24c-2.3 0-2.91.01-3.81.05l-.42.02c-1.17.05-1.8.25-2.23.41-.56.22-.96.48-1.38.9-.4.41-.67.8-.88 1.35l-.03.06a6.7 6.7 0 0 0-.4 2.2l-.02.45c-.04.9-.05 1.53-.05 3.94v1.08c0 2.64.02 3.05.07 4.23v.07c.06 1.13.25 1.74.42 2.16.21.56.47.96.9 1.38.4.4.8.67 1.34.88l.06.03a6.7 6.7 0 0 0 2.2.4l.45.02c.9.04 1.53.05 3.94.05h1.08c2.64 0 3.05-.02 4.23-.07h.07a6.51 6.51 0 0 0 2.16-.42c.52-.19.99-.5 1.38-.9.4-.4.67-.8.88-1.34l.03-.06a6.7 6.7 0 0 0 .4-2.2l.02-.45c.04-.9.05-1.53.05-3.94v-1.09c0-2.63-.02-3.04-.07-4.22v-.07a6.51 6.51 0 0 0-.42-2.16c-.19-.52-.5-.99-.9-1.38a3.7 3.7 0 0 0-1.34-.88l-.06-.03a6.63 6.63 0 0 0-2.16-.4l-.46-.02c-.9-.04-1.5-.05-3.8-.05zM16 9.84a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32zM16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.4-3.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
