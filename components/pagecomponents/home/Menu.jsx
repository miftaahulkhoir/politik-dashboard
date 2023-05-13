import React, { Fragment, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { MdOutlineLayers, MdShowChart, MdOpenInNew } from "react-icons/md";
import { BsCaretDownFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";
import { useFindAllIssues, useFindAllYearsByIssue, useFindAllSubIssues } from "@/utils/services/issue";

const LayerFilter = ({ setIsShowGeoJSON }) => {
  const { issues, isLoading } = useFindAllIssues();
  const [isLayerOpen, setIsLayerOpen] = useState(false);

  const [selected, setSelected] = useState(issues[0]);
  const { years, isLoading: isLoadingYear } = useFindAllYearsByIssue(selected?.id);

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const { subIssues, isLoading: isLoadingSubIssue } = useFindAllSubIssues(selected?.id, selectedYear?.value);

  useEffect(() => {
    if (selected || isLoading || !issues?.length) return;
    setSelected(issues[0]);
  }, [isLoading]);

  useEffect(() => {
    if (selectedYear || isLoadingYear || !years.length) return;
    setSelectedYear(years[years.length - 1]);
  }, [isLoadingYear]);

  useEffect(() => {
    if (selected && selectedYear && isLayerOpen) {
      setIsShowGeoJSON(true);
    }
  }, [selected, selectedYear, isLayerOpen]);

  const mappingIssues = (Boolean(issues.length) && Object.fromEntries(issues.map((obj) => [obj.value, obj]))) || [];
  const mappingYears = (Boolean(years.length) && Object.fromEntries(years.map((obj) => [obj.value, obj]))) || [];

  return isLayerOpen ? (
    <div className="absolute left-[62px] top-[calc(78px+56px)]">
      <div className="flex flex-col justify-between py-6 px-6 w-[360px] h-[calc(100vh-150px)]  bg-new-black-secondary gap-3">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between h-fit items-center w-full">
              <div className="flex gap-2 items-center">
                <MdOutlineLayers size={32} className="text-white" />
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-white ">Daftar Isu</div>
                  <div className="text-sm text-white ">
                    Last Update <b>{moment().format("DD MMM YYYY")}</b>
                  </div>
                </div>
              </div>
              <BsChevronLeft className="text-white" strokeWidth={1.5} size={24} onClick={() => setIsLayerOpen(false)} />
            </div>
            <div className="flex">
              {isLoading ? (
                <Listbox>
                  <div className="relative mt-1 w-full">
                    <Listbox.Button className="relative w-full cursor-pointer  bg-new-black-secondary border-[1px] border-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2  ">
                      <span className="block truncate text-white font-bold">loading ...</span>
                    </Listbox.Button>
                  </div>
                </Listbox>
              ) : (
                <Listbox value={selected} onChange={(value) => setSelected(mappingIssues[value])}>
                  <div className="relative mt-1 w-full">
                    <Listbox.Button className="relative w-full cursor-pointer  bg-new-black-secondary border-[1px] border-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2  ">
                      <span className="block truncate text-white font-bold">{selected.label}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsCaretDownFill className="h-3 w-3 text-white" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-new-black-secondary border-[1px] border-white text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {Object.values(mappingIssues).map((issue) => (
                          <Listbox.Option
                            key={issue.id}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                                active && "font-bold"
                              } hover:bg-gray-50 hover:text-new-black-secondary`
                            }
                            value={issue.value}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                  {issue.label}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              )}
              {isLoadingYear || !selectedYear ? (
                <Listbox>
                  <div className="relative mt-1 w-[150px]">
                    <Listbox.Button className="relative w-full cursor-pointer  bg-new-black-secondary border-[1px] border-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2  ">
                      <span className="block truncate text-white font-bold">loading ...</span>
                    </Listbox.Button>
                  </div>
                </Listbox>
              ) : (
                <Listbox value={selectedYear} onChange={(value) => setSelectedYear(mappingYears[value])}>
                  <div className="relative mt-1 w-[150px]">
                    <Listbox.Button className="relative w-full cursor-pointer  bg-new-black-secondary border-[1px] border-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2  ">
                      <span className="block truncate text-white font-bold">{selectedYear.label}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsCaretDownFill className="h-3 w-3 text-white" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-new-black-secondary border-[1px] border-white text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {Object.values(mappingYears).map((year) => (
                          <Listbox.Option
                            key={year.id}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                                active && "font-bold"
                              } hover:bg-gray-50 hover:text-new-black-secondary`
                            }
                            value={year.value}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                  {year.label}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              )}
            </div>
          </div>
          {isLoadingSubIssue ? (
            <span className="ml-2 text-sm text-white">Loading ...</span>
          ) : (
            <div className="flex flex-col p-3 gap-2">
              <div className="flex items-center mr-4">
                <input
                  id="green-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                />
                <label for="green-checkbox" className="ml-2 text-sm text-white font-bold">
                  #
                </label>
                <label for="green-checkbox" className="ml-2 text-sm text-white ">
                  Semua Kejahatan
                </label>
              </div>
              {Boolean(subIssues?.length) &&
                subIssues.map((subIssue, i) => (
                  <div className="flex items-center mr-4" key={subIssue.id}>
                    <input
                      id={subIssue.value}
                      type="checkbox"
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                    />
                    <label for={subIssue.value} className="ml-2 text-sm font-bold text-white ">
                      {i + 1}
                    </label>
                    <label for={subIssue.value} className="ml-2 text-sm text-white">
                      {subIssue.label}
                    </label>
                  </div>
                ))}
            </div>
          )}
        </div>
        <button className="bg-primary text-white py-3 rounded-lg font-semibold">Terapkan</button>
      </div>
      <div className="absolute left-[380px] top-[28px] p-6 bg-[#FFFFFF90] rounded-sm flex gap-3">
        <div className="flex flex-col gap-2 w-[150px]">
          <div className="text-sm">Negara</div>
          <div className="text-xs font-bold">Indonesia</div>
        </div>
        <div className="w-[1px] bg-black h-[44px]" />
        <div className="flex flex-col gap-2 w-[150px]">
          <div className="text-sm">Provinsi</div>
          <div className="flex justify-between cursor-pointer">
            <div className="text-xs font-bold">-</div>
            <BsCaretDownFill className="h-3 w-3 text-black" aria-hidden="true" />
          </div>
        </div>
        <div className="w-[1px] bg-black h-[44px]" />
        <div className="flex flex-col gap-2 w-[150px]">
          <div className="text-sm">Kabupaten</div>
          <div className="flex justify-between cursor-pointer">
            <div className="text-xs font-bold">-</div>
            <BsCaretDownFill className="h-3 w-3 text-black" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="flex items-center justify-center w-[112px] h-[88px] absolute left-[62px] top-[calc(78px+56px)] bg-new-black-secondary gap-3 cursor-pointer"
      onClick={() => setIsLayerOpen(true)}
    >
      <div className="relative">
        <MdOutlineLayers size={32} className="text-white" />
        <div className="absolute -bottom-2 left-2 bg-blue-600 text-white px-3  text-xs rounded-full">3</div>
      </div>
      <BsChevronRight className="text-white" strokeWidth={1.5} size={24} />
    </div>
  );
};

const LayerData = () => {
  return (
    <div className="absolute right-0 top-[78px] text-white">
      <div className="flex items-center bg-new-black px-[24px] h-[78px]">
        <MdShowChart size={32} />
        <span className="font-semibold text-xl">Analisis</span>
      </div>
      <div className="flex flex-col justify-between p-8 w-[329px] h-[calc(100vh-150px)] bg-new-black-secondary gap-3">
        <div className="flex flex-col gap-3">
          <span className="font-bold text-sm">Provinsi</span>
          <div className="flex flex-col text-sm gap-3">
            <div className="flex justify-between">
              <span>Sumatra Utara</span>
              <div className="flex items-center gap-1.5">
                <span>16k</span> <MdOpenInNew />
              </div>
            </div>
            <div className="flex justify-between">
              <span>Metro Jaya</span>
              <div className="flex items-center gap-1.5">
                <span>12k</span> <MdOpenInNew />
              </div>
            </div>
            <div className="flex justify-between">
              <span>Jawa Timur</span>
              <div className="flex items-center gap-1.5">
                <span>8k</span> <MdOpenInNew />
              </div>
            </div>
            <div className="flex justify-between">
              <span>Sulawesi Selatan</span>
              <div className="flex items-center gap-1.5">
                <span>4k</span> <MdOpenInNew />
              </div>
            </div>
            <div className="flex justify-between">
              <span>Sumatera Selatan</span>
              <div className="flex items-center gap-1.5">
                <span>2k</span> <MdOpenInNew />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t py-4">
          <span className="font-bold text-sm">Legenda</span>
          <div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 bg-[#F78A25]"></div>
              <span className="text-sm">{">10k"}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 bg-[#F8AC66]"></div>
              <span className="text-sm">8k - 10k</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 bg-[#FDC694]"></div>
              <span className="text-sm">4k - 8k</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 bg-[#FFE3CA]"></div>
              <span className="text-sm">{"< 4k"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Menu = ({ setIsShowGeoJSON }) => {
  return (
    <>
      <Sidebar />
      <LayerFilter setIsShowGeoJSON={setIsShowGeoJSON} />
      <TopBar />
      <LayerData />
    </>
  );
};

export default Menu;
