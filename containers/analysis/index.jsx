import { BiBorderRadius, BiMaleFemale } from "react-icons/bi";
import { Tab } from "@headlessui/react";

import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { MdFamilyRestroom, MdShareLocation } from "react-icons/md";

import SideMenu from "./components/side-menu";
import DemographyTab from "./components/demography-tabs";
import AnalysisTab from "./components/analysis-tab";
import { DEMOGRAPHY_DATA } from "./data/demography";
import DashboardLayout from "@/layouts/DashboardLayout";
import Filter from "./components/filter";

const DemographyDetail = () => {
  return (
    <div className="w-[916px] h-[83px] rounded border border-[#9A9A9A] mt-4 flex items-center px-9 justify-between">
      <div className="flex items-center gap-3">
        <BiMaleFemale className="w-6 h-6 !text-[#4F5FC7]" />
        <div className="flex-col">
          <p className="text-white text-[13px]">Jumlah Penduduk</p>
          <p className="text-white text-[14px] font-semibold">{DEMOGRAPHY_DATA?.detail?.total_population} jiwa</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MdShareLocation className="w-6 h-6 !text-[#4F5FC7]" />
        <div className="flex-col">
          <p className="text-white text-[13px]">Luas Wilayah</p>
          <p className="text-white text-[14px] font-semibold">
            {DEMOGRAPHY_DATA?.detail?.total_area} km<sup>2</sup>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MdFamilyRestroom className="w-6 h-6 !text-[#4F5FC7]" />
        <div className="flex-col">
          <p className="text-white text-[13px]">Kepadatan</p>
          <p className="text-white text-[14px] font-semibold">
            {DEMOGRAPHY_DATA?.detail?.population_density} jiwa/km<sup>2</sup>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <BiBorderRadius className="w-6 h-6 !text-[#4F5FC7]" />
        <div className="flex-col">
          <p className="text-white text-[13px]">Jumlah Keluarga</p>
          <p className="text-white text-[14px] font-semibold">{DEMOGRAPHY_DATA?.detail?.total_family} keluarga</p>
        </div>
      </div>
    </div>
  );
};

const Analysis = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="max-h-screen overflow-hidden">
      <DashboardLayout>
        <div className="max-h-[calc(100vh-110px)] ml-[62px] mt-[57px] relative overflow-y-auto overflow-x-hidden">
          <Filter />

          <div className="w-full  h-full bg-[#151922] flex flex-row">
            <SideMenu />
            <div className="content flex-1">
              <div className="pt-12 flex flex-col justify-around">
                <div className="w-full px-20">
                  <FaArrowLeft className="!text-white w-5 h-5 mb-6" />
                  <div className="flex flex-col">
                    <p className="font-semibold text-xl text-white">INDONESIA</p>
                    <p className="font-semibold text-[13px] text-[#9A9A9A]">Indonesia</p>
                  </div>
                  <div className="flex items-end gap-2 mt-[26px]">
                    <p className="font-semibold text-base text-white">Demografi</p>
                    <p className="text-xs text-[#9A9A9A]">
                      Pembaruan data terakhir: {DEMOGRAPHY_DATA?.detail?.last_updated}
                    </p>
                  </div>
                  <DemographyDetail />
                </div>

                <div className="w-full mt-16">
                  <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <Tab.List className="flex border-b border-b-gray-200 px-20">
                      <Tab
                        className={({ selected }) =>
                          `text-white  px-4 py-2 text-sm font-semibold ${
                            selected ? "border-b-2 border-b-[#4F5FC7]" : "hover:text-gray-700"
                          }`
                        }
                      >
                        Demografi
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          `text-white  px-4 py-2 text-sm font-semibold ${
                            selected ? "border-b-2 border-[#4F5FC7]" : "hover:text-gray-700"
                          }`
                        }
                      >
                        Analisis
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <div className="w-full">
                          <DemographyTab />
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="w-full">
                          <AnalysisTab />
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Analysis;
