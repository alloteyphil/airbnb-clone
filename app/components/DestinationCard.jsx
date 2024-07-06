import Image from "next/image";

const DestinationCard = ({ name, img, onClick }) => {
  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <div className="overflow-hidden rounded-lg w-[100px] h-[100px]">
        <Image
          placeholder="blur"
          blurDataURL={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Ug8AAk0BZU1+kw8AAAAASUVORK5CYII="
          }
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
