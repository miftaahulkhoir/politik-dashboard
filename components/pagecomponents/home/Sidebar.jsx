import React, { useState } from "react";

import cx from "classnames";

import { RxDashboard } from "react-icons/rx";
import { ImMap2 } from "react-icons/im";
import { RiBook2Line } from "react-icons/ri";
import { TbCalendarEvent } from "react-icons/tb";
import { BsFillGridFill } from "react-icons/bs";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { TfiFlagAlt2 } from "react-icons/tfi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FiUser, FiUsers } from "react-icons/fi";
import { CgLogOff } from "react-icons/cg";
import { logoutUser } from "@/utils/services/auth";

const sidebarMenu = [
  {
    label: "dashboard",
    icon: (props) => <RxDashboard {...props} />,
  },
  { label: "map", icon: (props) => <ImMap2 {...props} /> },
  {
    label: "dummy",
    icon: (props) => <TbCalendarEvent {...props} />,
  },
  {
    label: "dummy",
    icon: (props) => <RiBook2Line {...props} />,
  },
  {
    label: "dummy",
    icon: (props) => <BsFillGridFill {...props} />,
  },
  {
    label: "dummy",
    icon: (props) => <MdOutlineNotificationAdd {...props} />,
  },
  {
    label: "dummy",
    icon: (props) => <TfiFlagAlt2 {...props} />,
  },
  {
    label: "dummy",
    icon: (props) => <AiOutlineWhatsApp {...props} />,
  },
  { label: "users", icon: (props) => <FiUsers {...props} /> },
  { label: "dummy", icon: (props) => <FiUser {...props} /> },
];

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState("map");

  return (
    <div className="sidebar bg-white absolute left-0 h-[calc(100vh-78px)] w-[62px] top-[78px] z-20 flex flex-col justify-between py-6 px-2 border-r-[2px] border-gray-200">
      <div className="flex flex-col gap-2">
        {sidebarMenu.map(({ label, icon }) => (
          <div
            key={label}
            className={cx(
              selectedMenu === label && "bg-red-secondary",
              "flex h-[44px] w-[44px] items-center justify-center  rounded-md cursor-pointer",
              label === "users" && "mt-12",
            )}
          >
            {icon({
              size: 20,
              className: selectedMenu === label && "text-red-primary",
            })}
          </div>
        ))}
      </div>
      <div
        className={cx(
          selectedMenu === "dashboards" && "bg-red-secondary",
          "flex h-[44px] w-[44px] items-center justify-center  rounded-md cursor-pointer",
        )}
        onClick={async () => await logoutUser()}
      >
        <CgLogOff size={20} className={"text-red-primary"} />
      </div>
    </div>
  );
};

export default Sidebar;
