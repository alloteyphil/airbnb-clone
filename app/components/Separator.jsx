const Separator = ({ isFooter, isDestinationPage = false }) => {
  return (
    <div
      className={`border-b w-full ${
        isFooter ? "border-neutral-300 py-3" : "border-neutral-200 pb-3"
      } ${isDestinationPage ? "hidden" : ""}`}
    ></div>
  );
};

export default Separator;
