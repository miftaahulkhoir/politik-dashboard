import React from "react";
import cx from "classnames";
import { TbUserCircle } from "react-icons/tb";
import isEmpty from "lodash/isEmpty";

const UserCard = ({ name, email, nik, isSelected, avatar, onClick }) => {
  return (
    <div
      className={cx("p-3 w-full h-20 flex items-center cursor-pointer hover:bg-neutral-700", {
        "!bg-neutral-700": isSelected,
      })}
      onClick={onClick}
    >
      <div className="flex gap-3 cursor-pointer">
        {!isEmpty(avatar) ? (
          <img class="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar" />
        ) : (
          <TbUserCircle className="w-10 h-10" />
        )}

        <div className="flex flex-col gap-[2px]">
          <div className="text-white text-sm font-medium">{name}</div>
          <div className="text-xs text-neutral-400">{email}</div>
          <div className="text-xs text-neutral-400">NIK: {nik}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
