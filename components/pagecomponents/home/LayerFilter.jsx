import React, { Fragment, useContext, useEffect, useMemo, useState } from "react";

import { MdOutlineLayers } from "react-icons/md";
import { BsCaretDownFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";
import { useFindAllIssues, useFindAllYearsByIssue, useFindAllSubIssues } from "@/utils/services/issue";
import { MonitoringContext } from "@/providers/issue-providers";
const LayerFilter = ({ setIsShowGeoJSON }) => {
  const { isLayerOpen, setIsLayerOpen, selected, setSelected, selectedYear, setSelectedYear } =
    useContext(MonitoringContext);

  const { data: issues, isLoading } = useFindAllIssues({
    onSuccess: (data) => {
      setSelected(data[0]);
    },
  });

  const { data: years, isLoading: isLoadingYear } = useFindAllYearsByIssue(selected?.id, {
    onSuccess: (data) => {
      setSelectedYear(data[data.length - 1]);
    },
    enabled: !!selected?.id && selected.id !== "3",
  });

  const { data: subIssues, isLoading: isLoadingSubIssue } = useFindAllSubIssues(
    {
      id: selected?.value,
      year: selectedYear?.value,
    },
    {
      enabled: !!selectedYear?.value && selected.id !== "3",
    },
  );

  useEffect(() => {
    if (selected && selectedYear && isLayerOpen) {
      setIsShowGeoJSON(true);
    }
  }, [selected, selectedYear, isLayerOpen]);

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
              <BsChevronLeft
                className="text-white cursor-pointer"
                strokeWidth={1.5}
                size={24}
                onClick={() => {
                  setIsLayerOpen(false);
                  setIsShowGeoJSON(false);
                }}
              />
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
                <Listbox
                  value={selected}
                  onChange={(value) => {
                    setSelectedYear(null);
                    setSelected(issues.find((data) => data.value === value));
                  }}
                >
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
                        {issues.map((issue) => (
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
                <Listbox
                  value={selectedYear}
                  onChange={(value) => setSelectedYear(years.find((data) => data.value === value))}
                >
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
                        {years.map((year) => (
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
                  Semua {selected.label}
                </label>
              </div>
              <div className="h-[400px] overflow-auto">
                {subIssues.map((subIssue, i) => (
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

export default LayerFilter;
