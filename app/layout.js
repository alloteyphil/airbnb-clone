import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb clone",
  description: "Next js airbnb clone",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader color="#FF385C" height={5} />
          <div className="font-light text-sm">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
