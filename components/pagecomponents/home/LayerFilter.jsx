import React, { Fragment, useContext, useEffect, useMemo, useState } from "react";

import { MdAreaChart, MdOutlineLayers } from "react-icons/md";
import { BsCaretDownFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";
import {
  useFindAllIssues,
  useFindAllYearsByIssue,
  useFindAllSubIssues,
  useGetAllProvinces,
  useFindKabkot,
} from "@/utils/services/issue";
import { MonitoringContext } from "@/providers/issue-providers";
import clsx from "clsx";
import { FiMapPin } from "react-icons/fi";

const LayerFilter = ({ setKabkotGeom }) => {
  const {
    isLayerOpen,
    setIsLayerOpen,
    selected,
    setSelected,
    selectedYear,
    setSelectedYear,
    setSelectedLayer,
    selectedProvince,
    selectedLayer,
    setSelectedProvince,
    selectedKabkot,
    setselectedKabkot,
    setIsShowGeoJSON,
    isShowGeoJSON,
  } = useContext(MonitoringContext);

  const [activeLayer, setActiveLayer] = useState([]);

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

  const { data: provinces, isLoading: isProvincesLoading } = useGetAllProvinces({
    onSuccess: (data) => {
      // Set default "Semua" jika belum ada selectedProvince
      if (!selectedProvince && data && data.length > 0) {
        setSelectedProvince(data[0]); // data[0] adalah "Semua"
      }
    },
  });
  const { data: listKabkot, isLoading: isKabkotLoading } = useFindKabkot(selectedProvince?.id, {
    enabled: !!selectedProvince?.id && selectedProvince?.id !== 0, // Disable jika provinsi "Semua" atau tidak ada
    onSuccess: (data) => {
      // Set default "Semua" untuk kabupaten jika belum ada selectedKabkot
      if (!selectedKabkot && data && data.length > 0) {
        setselectedKabkot(data[0]); // data[0] adalah "Semua"
      }
    },
  });

  useEffect(() => {
    if (selected && selectedYear && isLayerOpen) {
      setIsShowGeoJSON(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selectedYear, isLayerOpen]);

  const isTerorisme = useMemo(() => selected.id == 3, [selected]);

  const applyLayer = () => {
    setSelectedLayer(activeLayer);
  };

  const onCheckLayer = (index) => {
    if (activeLayer.includes(index)) {
      setActiveLayer((prev) => prev.filter((data) => data != index));
      return;
    }

    setActiveLayer((prev) => [...prev, index]);
  };

  const onCheckAllLayer = () => {
    if (subIssues.length === activeLayer.length) {
      setActiveLayer([]);
      return;
    }
    setActiveLayer(subIssues.map((data) => data.id));
  };

  return (
    <div className="absolute left-[62px] top-[calc(78px+56px)]">
      {/* {isLayerOpen ? (
        <div>
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
                        setSelectedLayer([]);
                        setActiveLayer([]);
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
                            {issues?.map((issue) => (
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
                  {!isTerorisme && (
                    <>
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
                          onChange={(value) => {
                            setSelectedYear(years.find((data) => data.value === value));
                            setSelectedLayer([]);
                            setActiveLayer([]);
                          }}
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
                                {years?.map((year) => (
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
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div
                    className={clsx(
                      "px-3 py-2 flex items-center justify-center rounded-md cursor-pointer text-white",
                      !isShowGeoJSON ? "border-[1px] border-white" : "bg-primary ",
                    )}
                    onClick={() => {
                      setIsShowGeoJSON((prev) => !prev);
                    }}
                  >
                    <MdAreaChart size={24} />
                  </div>
                  <div
                    className={clsx(
                      "px-3 py-2 flex items-center justify-center gap-1",
                      "border-[1px] border-white text-white rounded-md",
                    )}
                  >
                    <FiMapPin size={24} />
                    {selectedLayer.length > 0 && (
                      <div className="px-3 py-[1px] bg-primary rounded-lg text-xs font-bold text-white ">
                        {selectedLayer.length}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="text-white cursor-pointer"
                  onClick={() => {
                    setSelectedLayer([]);
                    setSelected(issues[0]);
                    if (selected.id == 1) {
                      setSelectedYear(years[years.length - 1]);
                    }
                    setSelectedProvince(null);
                    setKabkotGeom(null);
                    setActiveLayer([]);
                  }}
                >
                  Reset
                </div>
              </div>
              {!isTerorisme && (
                <>
                  {isLoadingSubIssue ? (
                    <span className="ml-2 text-sm text-white">Loading ...</span>
                  ) : (
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex items-center mr-4">
                        <input
                          id="green-checkbox"
                          type="checkbox"
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                          checked={activeLayer.length === subIssues.length}
                          onChange={onCheckAllLayer}
                        />
                        <label htmlFor="green-checkbox" className="ml-2 text-sm text-white font-bold">
                          #
                        </label>
                        <label htmlFor="green-checkbox" className="ml-2 text-sm text-white ">
                          Semua {selected.label}
                        </label>
                      </div>
                      <div className="h-[400px] overflow-auto">
                        {subIssues.map((subIssue, i) => {
                          const checked = activeLayer.includes(i + 1);

                          return (
                            <div className="flex items-center mr-4" key={subIssue.id}>
                              <input
                                id={subIssue.value}
                                type="checkbox"
                                checked={checked}
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                                onChange={() => onCheckLayer(i + 1)}
                              />
                              <label htmlFor={subIssue.value} className="ml-2 text-sm font-bold text-white ">
                                {i + 1}
                              </label>
                              <label htmlFor={subIssue.value} className="ml-2 text-sm text-white">
                                {subIssue.label}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <button className="bg-primary text-white py-3 rounded-lg font-semibold" onClick={applyLayer}>
              Terapkan
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center w-[112px] h-[88px] bg-new-black-secondary gap-3 cursor-pointer"
          onClick={() => {
            setIsLayerOpen(true);
          }}
        >
          <div className="relative">
            <MdOutlineLayers size={32} className="text-white" />
            {selectedLayer.length > 0 && (
              <div className="absolute -bottom-2 left-2 bg-blue-600 text-white px-3  text-xs rounded-full">
                {selectedLayer.length}
              </div>
            )}
          </div>
          <BsChevronRight className="text-white" strokeWidth={1.5} size={24} />
        </div>
      )} */}
      <div className={""}>
        {selectedLayer.length > 0 && (
          <div
            className={clsx(
              "absolute  px-3 py-5 bg-new-black flex gap-4 text-white h-fit items-center",
              isLayerOpen ? "w-[calc(100vw-750px)]" : "w-[calc(100vw-050px)]",
            )}
          >
            {selectedLayer.map((data) => (
              <div className="flex gap-2 items-center" key={subIssues[data - 1].id}>
                <img
                  src={`/images/map/markers/${selected.value}-${subIssues[data - 1].id}.${
                    selected.value == "bencana" ? "svg" : "png"
                  }`}
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="text-md font-bold">{`< ${selectedProvince ? 10 : 340}`}</div>
                  <div className="text-xs">{subIssues[data - 1].label}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {(isLayerOpen || true) && (
          <div
            className={clsx(
              selectedLayer.length > 0 ? "top-[98px]" : "top-[28px]",
              "absolute left-[20px] p-6 bg-[#FFFFFF90] rounded-sm flex gap-3 ",
            )}
          >
            {/* <div className="flex flex-col gap-2 w-[150px]">
              <div className="text-sm">Negara</div>
              <div className="text-xs font-bold">Indonesia</div>
            </div> */}
            {/* <div className="w-[1px] bg-black h-[44px]" /> */}
            <div className="flex flex-col  w-[150px]">
              <div className="text-sm">Provinsi</div>
              {/* {isLoading ? (
                <Listbox>
                  <div className="relative w-full">
                    <Listbox.Button className="relative w-full cursor-pointer    ">
                      <span className="block truncate text-white font-bold">loading ...</span>
                    </Listbox.Button>
                  </div>
                </Listbox>
              ) : (
              )} */}
              <Listbox
                value={selectedProvince?.id}
                onChange={(value) => {
                  setselectedKabkot(null);
                  setKabkotGeom(undefined);
                  setSelectedLayer([]);
                  setActiveLayer([]);
                  // if (value == "reset") {
                  //   setSelectedProvince(provinces?.[0] || null); // Reset ke "Semua"
                  //   return;
                  // }
                  setSelectedProvince(provinces.find((data) => data.id === value));
                }}
              >
                <div className="relative w-full">
                  <Listbox.Button className="relative w-full cursor-pointer  text-left   ">
                    <span className="block truncate  font-bold text-xs">
                      {selectedProvince ? selectedProvince.name : "-"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <BsCaretDownFill className="h-3 w-3 " aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute  max-h-60 w-full overflow-auto  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-[#FFFFFF]">
                      {/* <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-1 pl-1 pr-4 text-xs ${
                            active && "font-bold"
                          } hover:bg-gray-50 hover:text-new-black-secondary`
                        }
                        value={"reset"}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>Reset</span>
                          </>
                        )}
                      </Listbox.Option> */}
                      {provinces?.map((province) => (
                        <Listbox.Option
                          key={province.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-1 pl-1 pr-4 text-xs ${
                              active && "font-bold"
                            } hover:bg-gray-50 hover:text-new-black-secondary`
                          }
                          value={province.id}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                {province.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            {/* <div className="w-[1px] bg-black h-[44px]" /> */}
            {/* <div className="flex flex-col  w-[150px]">
              <div className="text-sm">Kabupaten</div>
              {!selectedProvince || selectedProvince.id === 0 ? (
                <Listbox disabled>
                  <div className="relative w-full">
                    <Listbox.Button className="relative w-full cursor-not-allowed opacity-50">
                      <span className="block truncate font-bold text-xs">Pilih Provinsi Dulu</span>
                    </Listbox.Button>
                  </div>
                </Listbox>
              ) : isKabkotLoading ? (
                <Listbox>
                  <div className="relative w-full">
                    <Listbox.Button className="relative w-full cursor-pointer    ">
                      <span className="block truncate  font-bold text-xs">Loading...</span>
                    </Listbox.Button>
                  </div>
                </Listbox>
              ) : (
                <Listbox
                  value={selectedKabkot?.id}
                  onChange={(value) => {
                    setselectedKabkot(listKabkot.find((data) => data.id === value));
                  }}
                >
                  <div className="relative w-full">
                    <Listbox.Button className="relative w-full cursor-pointer  text-left   ">
                      <span className="block truncate  font-bold text-xs">
                        {selectedKabkot ? selectedKabkot.name : "-"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsCaretDownFill className="h-3 w-3 " aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute  max-h-60 w-full overflow-auto  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-[#FFFFFF]">
                        {listKabkot?.map((kabkot) => (
                          <Listbox.Option
                            key={kabkot.id}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-1 pl-1 pr-4 text-xs ${
                                active && "font-bold"
                              } hover:bg-gray-50 hover:text-new-black-secondary`
                            }
                            value={kabkot.id}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                  {kabkot.name}
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
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerFilter;
