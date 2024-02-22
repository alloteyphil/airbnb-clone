import Image from "next/image";

const DestinationCard = ({ name, img, onClick }) => {
  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <div className="overflow-hidden rounded-lg w-[100px] h-[100px]">
        <Image
          src={img}
          alt={name}
          className="w-full h-full object-cover object-center transition hover:scale-110 duration-300"
          onClick={onClick}
        />
      </div>
      <p className="font-light text-sm">{name}</p>
    </div>
  );
};

export default DestinationCard;
