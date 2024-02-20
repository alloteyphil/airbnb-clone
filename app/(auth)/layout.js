import React from "react";

const layout = ({ children }) => {
  return (
    <div className=" min-h-screen w-full grid place-items-center">
      {children}
    </div>
  );
};

export default layout;
