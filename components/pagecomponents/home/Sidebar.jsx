import React from "react";

import cx from "classnames";

import { ImMap2 } from "react-icons/im";
import { RiSurveyLine } from "react-icons/ri";
import { TbSocial } from "react-icons/tb";
import { CgLogOff } from "react-icons/cg";
import { logoutUser } from "@/utils/services/auth";
import { routes } from "@/constants/route";
import Link from "next/link";
import { useRouter } from "next/router";

const sidebarMenu = [
  {
    label: routes.home.name,
    path: routes.home.path,
    icon: (props) => <ImMap2 strokeWidth={1} {...props} />,
  },
  {
    label: routes.talkwalker.name,
    icon: (props) => <TbSocial {...props} />,
    path: routes.talkwalker.path,
  },
  {
    label: routes.survey.name,
    path: routes.survey.path,
    icon: (props) => <RiSurveyLine {...props} />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = router.pathname.replace("/", "");

  return (
    <div className="sidebar bg-new-black absolute left-0 h-[calc(100vh-78px)] w-[62px] top-[78px] z-20 flex flex-col justify-between py-6 px-2 border-r-[2px] border-black">
      <div className="flex flex-col gap-2">
        {sidebarMenu.map(({ label, icon, path }) => (
          <Link href={path} key={label}>
            <div
              className={cx(
                pathname === label && "bg-white",
                "flex h-[44px] w-[44px] items-center justify-center  rounded-md cursor-pointer",
                label === "users" && "mt-12",
              )}
            >
              {icon({
                size: 20,
                className: pathname === label ? "text-new-black" : "text-white",
              })}
            </div>
          </Link>
        ))}
      </div>
      <div
        className={cx(
          pathname === "dashboards" && "white",
          "flex h-[44px] w-[44px] items-center justify-center  rounded-md cursor-pointer",
        )}
        onClick={async () => await logoutUser()}
      >
        <CgLogOff size={20} className={"text-white"} />
      </div>
    </div>
  );
};

export default Sidebar;
