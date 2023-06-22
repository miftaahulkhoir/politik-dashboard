import React from "react";

import cx from "classnames";

import { ImMap2 } from "react-icons/im";
import { RiSurveyLine } from "react-icons/ri";
import { TbSocial, TbUsers, TbServer2, TbAccessible, TbUser } from "react-icons/tb";
import { CgLogOff } from "react-icons/cg";
import { logoutUser } from "@/utils/services/auth";
import { routes } from "@/constants/route";
import Link from "next/link";
import { useRouter } from "next/router";
import accessChecker from "@/utils/helpers/accessChecker";
import { ACCESS_LIST } from "@/constants/access-list";
import { Tooltip } from "antd";

const SidebarMenu = ({ pathname, path, label, icon }) => {
  return (
    <Tooltip title={label} placement="right">
      <Link href={path} key={label}>
        <div
          className={cx(
            pathname === label && "bg-white",
            "flex h-[44px] w-[44px] items-center justify-center  rounded-md cursor-pointer",
          )}
        >
          {icon({
            size: 20,
            className: pathname === label ? "text-new-black" : "text-white",
          })}
        </div>
      </Link>
    </Tooltip>
  );
};

const Sidebar = ({ profile }) => {
  const router = useRouter();
  const pathname = router.pathname.split("/")?.[1];

  const [
    canAccessMonitoring,
    canAccessManagement,
    canAccessUserManagement,
    canAccessDataManagement,
    canAccessSurvey,
    canAccessTalkWalker,
    canAccessManagementIssue,
  ] = accessChecker(
    [
      ACCESS_LIST.MONITORING,
      ACCESS_LIST.MANAGEMENT_ACCESS,
      ACCESS_LIST.MANAGEMENT_USER,
      ACCESS_LIST.MANAGEMENT_DATA,
      ACCESS_LIST.SURVEY,
      ACCESS_LIST.TALKWALKER,
      ACCESS_LIST.MANAGEMENT_ISSUE,
    ],
    profile?.accesses || [],
  );

  const sidebarMenu = [
    ...(canAccessMonitoring
      ? [
          {
            label: routes.home.name,
            path: routes.home.path,
            icon: (props) => <ImMap2 strokeWidth={1} {...props} />,
          },
        ]
      : []),
    ...(canAccessTalkWalker
      ? [
          {
            label: routes.talkwalker.name,
            icon: (props) => <TbSocial {...props} />,
            path: routes.talkwalker.path,
          },
        ]
      : []),
    ...(canAccessSurvey
      ? [
          {
            label: routes.survey.name,
            path: routes.survey.path,
            icon: (props) => <RiSurveyLine {...props} />,
          },
        ]
      : []),
  ];

  const sidebarMenuSecond = [
    ...(canAccessDataManagement
      ? [
          {
            label: routes.managementData.name,
            path: routes.managementData.path,
            icon: (props) => <TbServer2 {...props} />,
          },
        ]
      : []),
    ...(canAccessUserManagement
      ? [
          {
            label: routes.users.name,
            path: routes.users.path,
            icon: (props) => <TbUsers {...props} />,
          },
        ]
      : []),
    ...(canAccessManagement
      ? [
          {
            label: routes.managementAccess.name,
            path: routes.managementAccess.path,
            icon: (props) => <TbUser {...props} />,
          },
        ]
      : []),
    ...(canAccessManagementIssue
      ? [
          {
            label: routes.managementIssue.name,
            path: routes.managementIssue.path,
            icon: (props) => <TbAccessible {...props} />,
          },
        ]
      : []),
  ];

  return (
    <div className="sidebar bg-new-black absolute left-0 h-[calc(100vh-78px)] w-[62px] top-[78px] z-20 flex flex-col justify-between py-6 px-2 border-r-[2px] border-black">
      <div className="flex flex-col gap-2">
        {sidebarMenu.map(({ label, icon, path }) => (
          <SidebarMenu key={label} pathname={pathname} path={path} label={label} icon={icon} />
        ))}
      </div>
      <div>
        <div className="w-full h-[2px] bg-white mb-2" />
        {sidebarMenuSecond.map(({ label, icon, path }) => (
          <SidebarMenu key={label} pathname={pathname} path={path} label={label} icon={icon} />
        ))}
      </div>
      <Tooltip title="logout" placement="right">
        <div
          className={cx(
            pathname === "dashboards" && "white",
            "flex h-[44px] w-[44px] items-center justify-center  rounded-md cursor-pointer",
          )}
          onClick={async () => await logoutUser()}
        >
          <CgLogOff size={20} className={"text-white"} />
        </div>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
