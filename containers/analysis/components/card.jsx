import React from "react";

const CardContent = ({ className, children }) => {
  return (
    <div className={`w-full h-[255px] py-[38px] px-[84px] border border-[#E8E8E8] flex flex-col ${className}`}>
      {children}
    </div>
  );
};

export default CardContent;
