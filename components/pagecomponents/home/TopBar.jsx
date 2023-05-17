import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const TopBar = ({ isShowSearchRegion }) => {
  return (
    <div className="topbar bg-new-black absolute h-[56px] left-[62px] items-center px-6 w-[calc(100vw-62px)] top-[78px] z-20 flex py-6  border-r-[2px] border-b-[1px] border-black">
      <div className="text-md font-bold text-white">Pemetaan</div>
      <div className="flex gap-2 h-[32px] ml-[100px] items-center w-full">
        <div className="h-full w-[2px] bg-white" />
        <div className="flex justify-between w-full">
          <div className="flex gap-3">
            <div className="h-full cursor-pointer px-8 py-1 bg-primary text-white rounded-md text-sm font-bold flex items-center justify-center">
              Map
            </div>
            <div className="h-full cursor-pointer px-8 py-1 border-[1px] border-white text-white rounded-md text-sm font-bold flex items-center justify-center">
              Analisis
            </div>
          </div>
          {isShowSearchRegion && (
            <div className="relative">
              <BsSearch className="absolute top-2 left-3 text-white" size={15} />
              <input
                type="text"
                className="w-52 rounded-md border-[1px] border-white bg-new-black-secondary placeholder:text-white placeholder:text-xs px-3 pl-10 py-1"
                placeholder="Indonesia"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
