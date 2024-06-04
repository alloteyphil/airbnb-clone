import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SingleStayFooter = async ({ location, subtitle }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-black/90 font-light hover:underline"
          >
            Airbnb
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-black/90" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-black/90 font-light">
            {location.split(",")[0]}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-black/90" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-black/90 font-light">
            {location.split(",")[1]}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-black/90" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-black/90 font-light">
            {subtitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default SingleStayFooter;
