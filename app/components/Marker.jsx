import { Badge } from "@/components/ui/badge";

const Marker = ({ price }) => {
  return (
    <div className="">
      <Badge variant="default">{price}</Badge>
    </div>
  );
};

export default Marker;
