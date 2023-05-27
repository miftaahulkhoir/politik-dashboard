import React, { useContext } from "react";
import districts from "../../data/districts";

import { MdShowChart } from "react-icons/md";
import USERS from "../../data/users";
import { SurveyMapContext } from "../../SurveyMapContext";
import SidebarInfromationLegend from "./SidebarInformationLegend";

const SidebarInformation = () => {
  const { selectedSurveyQuestion } = useContext(SurveyMapContext);
  const koordinator = USERS.filter((x) => x.occupation?.level === 2);
  const relawan = USERS.filter((x) => x.occupation?.level === 3);
  const pemilih = USERS.filter((x) => x.occupation?.level === 4);
  const daftarhitam = USERS.filter((x) => x.occupation?.level === 5);

  const data = [
    {
      name: "Total koordinator",
      total: koordinator.length,
    },
    {
      name: "Total relawan",
      total: relawan.length,
    },
    {
      name: "Total kecamatan",
      total: districts.length,
    },
    {
      name: "Total pemilih",
      total: pemilih.length,
    },
    {
      name: "Total daftar hitam",
      total: daftarhitam.length,
    },
  ];
  return (
    <div className="absolute right-0 top-[134px] h-[calc(100vh-134px)] text-white">
      <div className="flex items-center bg-new-black px-[24px] h-[78px]">
        <MdShowChart size={32} />
        <span className="font-semibold text-xl">Data</span>
      </div>
      <div className="flex flex-col p-8 w-[329px] h-[calc(100vh-214px)] bg-new-black-secondary gap-3">
        <div className="flex flex-col gap-3">
          <span className="font-bold text-sm">Data Persebaran</span>
          <div className="flex flex-col text-sm gap-3">
            {data.map((item) => (
              <div className="flex justify-between" key={item.name}>
                <span>{item.name}</span>
                <div className="flex items-center gap-1.5">
                  <span>{item.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedSurveyQuestion && <SidebarInfromationLegend />}
      </div>
    </div>
  );
};

export default SidebarInformation;
