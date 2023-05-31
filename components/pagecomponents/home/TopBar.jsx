import cx from "classnames";
import React from "react";
import { BsSearch } from "react-icons/bs";

const TopBar = ({
  title,
  isShowSearchRegion,
  onClickMap,
  onClickAnalysis,
  buttonActive = "map",
  hideMapButton,
  customRender,
}) => {
  return (
    <div className="topbar bg-new-black absolute h-[56px] left-[62px] items-center px-6 w-[calc(100vw-62px)] top-[78px] z-20 flex py-6  border-r-[2px] border-b-[1px] border-black">
      <div className="text-md font-bold text-white whitespace-nowrap">{title}</div>
      <div className="flex gap-2 h-[32px] ml-[100px] items-center w-full">
        <div className="h-full w-[2px] bg-white" />
        {!hideMapButton && (
          <div className="flex justify-between w-full">
            <div className="flex gap-3">
              <div
                className={cx(
                  "h-full cursor-pointer px-8 py-1 text-white rounded-md text-sm font-bold flex items-center justify-center",
                  {
                    "bg-primary": buttonActive === "map",

                    "border-[1px] border-white": buttonActive !== "map",
                  },
                )}
                onClick={onClickMap}
              >
                Map
              </div>
              <div
                className={cx(
                  "h-full cursor-pointer px-8 py-1 text-white rounded-md text-sm font-bold flex items-center justify-center",
                  {
                    "bg-primary": buttonActive === "analysis",

                    "border-[1px] border-white": buttonActive !== "analysis",
                  },
                )}
                onClick={onClickAnalysis}
              >
                Analisis
              </div>
            </div>
            {isShowSearchRegion && (
              <div className="relative">
                <BsSearch className="absolute top-2 left-3 text-white" size={15} />
                <input
                  type="text"
                  className="text-white text-xs w-52 rounded-md border-[1px] border-white bg-new-black-secondary placeholder:text-white placeholder:text-xs px-3 pl-10 py-1"
                  placeholder="Indonesia"
                />
              </div>
            )}
          </div>
        )}
        {customRender}
      </div>
    </div>
  );
};

export default TopBar;
