"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homefooterlinks } from "@/data/homefooterlinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const HomeFooter = () => {
  const [selectedTab, setSelectedTab] = useState(homefooterlinks[0].header);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <footer className="flex flex-col gap-4 text-black/90/80 px-4 md:px-6">
      <h3 className="text-xl md:text-2xl font-medium w-full">
        Inspiration for future getaways
      </h3>

      {/* Mobile/iPad Dropdown */}
      <div className="md:hidden w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between border border-gray-300 rounded-md p-3">
            <span>{selectedTab}</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-2rem)]">
            {homefooterlinks.map((footerLink) => (
              <DropdownMenuItem
                key={footerLink.header}
                onClick={() => setSelectedTab(footerLink.header)}
              >
                {footerLink.header}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Content */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 pt-2 min-h-[200px] pb-4 w-full">
          {homefooterlinks
            .find((link) => link.header === selectedTab)
            ?.links.map((link) => (
              <div key={link.title} className="flex flex-col gap-1 text-sm">
                <p className="font-medium">{link.title}</p>
                <p className="text-accentDark">{link.subtitle}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block w-full">
        <Tabs defaultValue={homefooterlinks[0].header} className="w-full">
          <TabsList className="overflow-x-auto flex w-full justify-center">
            {homefooterlinks.map((footerLink) => (
              <TabsTrigger key={footerLink.header} value={footerLink.header}>
                {footerLink.header}
              </TabsTrigger>
            ))}
          </TabsList>

          {homefooterlinks.map((footerLink) => (
            <TabsContent
              key={footerLink.header}
              value={footerLink.header}
              className="grid grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-2 pt-6 min-h-[200px] pb-4 w-full"
            >
              {footerLink.links.map((link) => (
                <div key={link.title} className="flex flex-col gap-1 text-sm">
                  <p className="font-medium">{link.title}</p>
                  <p className="text-accentDark">{link.subtitle}</p>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </footer>
  );
};

export default HomeFooter;
