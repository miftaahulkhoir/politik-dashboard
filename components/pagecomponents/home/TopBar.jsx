import React, { useState } from "react";

import cx from "classnames";

const TopBar = () => {
  return (
    <div className="topbar bg-white absolute h-[56px] left-[62px] items-center px-6 w-[calc(100vw-62px)] top-[78px] z-20 flex py-6  border-r-[2px] border-gray-200">
      <div className="text-md font-bold">Pemetaan</div>
      <div className="flex gap-2 h-[32px] ml-[100px] items-center">
        <div className="h-full w-[2px] bg-black" />
        <div className="h-full cursor-pointer px-8 bg-red-primary text-white rounded-md text-sm font-bold flex items-center justify-center">
          Map
        </div>
        <div className="h-full cursor-pointer px-8 border-[1px] border-gray-400 text-gray-400 rounded-md text-sm font-bold flex items-center justify-center">
          Analisis
        </div>
      </div>
    </div>
  );
};

export default TopBar;
