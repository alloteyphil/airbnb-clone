const Separator = ({ isFooter, isDestinationPage = false }) => {
  return (
    <div
      className={`border-b w-full py-3 ${
        isFooter ? "border-gray-300" : "border-gray-200"
      } ${isDestinationPage ? "hidden" : ""}`}
    ></div>
  );
};

export default Separator;
