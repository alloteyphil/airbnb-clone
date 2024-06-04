import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homefooterlinks } from "@/data/homefooterlinks";

const HomeFooter = () => {
  return (
    <div className="flex flex-col gap-4 text-black/90/80">
      <h3 className="text-2xl font-medium w-full">
        Inspiration for future getaways
      </h3>
      <Tabs defaultValue={homefooterlinks[0].header}>
        <TabsList>
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
            className="grid grid-cols-6 gap-y-4 pt-6 min-h-[200px] pb-4 w-full"
          >
            {footerLink.links.map((link) => (
              <div key={link.title} className="flex flex-col gap-1 text-sm ">
                <p className="font-medium">{link.title}</p>
                <p className="text-accentDark">{link.subtitle}</p>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HomeFooter;
