import React from "react";
import cx from "classnames";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";

const GrowthIcon = ({ isGrowth, text }) => (
  <div className="flex items-center">
    {isGrowth ? (
      <MdOutlineArrowUpward className="w-6 h-6 !text-[#04C600]" />
    ) : (
      <MdOutlineArrowDownward className="w-6 h-6 !text-[#4F5FC7]" />
    )}

    <p
      className={cx("text-sm", {
        "!text-[#04C600]": isGrowth,
        "!text-[#4F5FC7]": !isGrowth,
      })}
    >
      {text}
    </p>
  </div>
);

export default GrowthIcon;
