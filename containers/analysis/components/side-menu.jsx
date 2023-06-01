import Link from "next/link";
import React from "react";
import { CRIME_MENU, DISASTER_MENU, TERRORIST_MENU } from "../constant";

const SideMenu = () => {
  return (
    <div className="min-w-[300px] max-w-[300px] sticky top-0  h-screen overflow-auto bg-[#353536] flex flex-col px-7 py-14 pb-[300px] border-r border-r-[#D9D9D9]">
      <div className="crime w-full flex flex-col">
        <div className="w-full">
          <p className="font-semibold text-xl text-white">Kejahatan</p>
          <Link href="crime">
            <p className="font-medium text-sm text-[#4F5FC7] mt-8 mb-5"># Semua Kejahatan</p>
          </Link>
          {CRIME_MENU?.map((menu, idx) => (
            <div className="menu w-full flex flex-col mt-7" key={idx}>
              <p className="menu-text font-semibold text-white">{menu?.title}</p>
              <div className="sub-menu flex flex-col gap-4 w-full pl-3 mt-5 mb-6">
                {menu?.subMenu?.map((subMenu, idx) => (
                  <Link key={idx} href="/analysis/crime">
                    <p className="menu-text text-white text-sm">{subMenu?.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full py-8 border-y border-y-white mt-7 ">
          <p className="font-semibold text-xl text-white">Bencana</p>
          <Link href="/analysis/disaster">
            <p className="font-medium text-sm text-[#4F5FC7] mt-6"># Semua Bencana</p>
          </Link>

          <div className="menu w-full flex flex-col">
            <div className="sub-menu flex flex-col gap-4 w-full pl-3 mt-5 mb-6">
              {DISASTER_MENU?.map((menu, idx) => (
                <Link key={idx} href="/analysis/disaster">
                  <p className="menu-text text-white text-sm">{menu}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mt-7">
          <p className="font-semibold text-xl text-white">Terrorisme</p>
          <Link href="/analysis/terrorism">
            <p className="font-medium text-sm text-[#4F5FC7] mt-8 mb-5"># Semua Terrorisme</p>
          </Link>
          {TERRORIST_MENU?.map((menu, idx) => (
            <div className="menu w-full flex flex-col mt-7" key={idx}>
              <p className="menu-text font-semibold text-white">{menu?.title}</p>
              <div className="sub-menu flex flex-col gap-4 w-full pl-3 mt-5 mb-6">
                {menu?.subMenu?.map((subMenu, idx) => (
                  <Link key={idx} href="/analysis/terrorism">
                    <p className="menu-text text-white text-sm">{subMenu?.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
