import Image from "next/image";
import testImage from "../../public/amsterdam.jpeg";

const TripsCard = () => {
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={testImage}
        className="w-20 h-20 rounded-xl"
        alt="test image"
      />
      <div className="flex flex-col">
        <p className="font-medium text-base">Location</p>
        <p className="text-neutral-500">Hosted by host</p>
        <p className="text-neutral-500">Date</p>
      </div>
    </div>
  );
};

export default TripsCard;
