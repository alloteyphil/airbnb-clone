const Separator = ({ isFooter }) => {
  return (
    <div
      className={`border-b w-full py-3 ${
        isFooter ? "border-gray-300" : "border-gray-200"
      }`}
    ></div>
  );
};

export default Separator;
