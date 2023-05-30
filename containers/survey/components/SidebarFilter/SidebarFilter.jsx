import React, { useContext, useState, Fragment } from "react";

import { MdOutlineLayers } from "react-icons/md";
import { BsCaretDownFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LIST_FILTERS from "../../constants/listFilters";
import { Listbox, Transition } from "@headlessui/react";

import cx from "classnames";
import ListOccupations from "./ListOccupations";
import ListSurveys from "./ListSurveys";
import { SurveyMapContext } from "../../SurveyMapContext";
import { useGetProvinces, useGetKabkot } from "@/utils/services/region";
import { isEmpty, keyBy } from "lodash";

const SidebarFilter = () => {
  const {
    isShowSidebarFilter,
    setIsShowSidebarFilter,
    reset,
    setTempSelectedSurvey,
    selectedSurvey,
    tempSelectedSurvey,
    selectedSurveyQuestion,
    selectedOccupation,
    setSelectedProvince,
    selectedProvince,
    selectedKabkot,
    setSelectedKabkot,
    setKabkotGeom,
  } = useContext(SurveyMapContext);
  const [selectedFilter, setSelectedFilter] = useState();

  const { data: provinces, isLoading: isLoadingProvince } = useGetProvinces({
    enabled: !isEmpty(selectedSurveyQuestion),
  });

  const { data: listKabkot, isLoading: isLoadingKabkot } = useGetKabkot(selectedProvince?.id, {
    enabled: !!selectedProvince?.id,
  });

  const mappedProvinces = keyBy(provinces, "id");
  const mappedListKabkot = keyBy(listKabkot, "id_kabkot");

  return isShowSidebarFilter ? (
    <div className="absolute left-[62px] top-[calc(78px+56px)]">
      <div className="flex flex-col justify-between py-6 px-6 w-[360px] h-[calc(100vh-150px)]  bg-new-black-secondary gap-3">
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-between h-fit items-center w-full">
              <div className="flex gap-2 items-center">
                <MdOutlineLayers size={32} className="text-white" />
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-white ">Daftar Filter</div>
                </div>
              </div>
              <BsChevronLeft
                className="text-white cursor-pointer"
                strokeWidth={1.5}
                size={24}
                onClick={() => {
                  setIsShowSidebarFilter(false);
                  if (!selectedSurvey && tempSelectedSurvey) {
                    setTempSelectedSurvey(undefined);
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-4 text-white flex-1">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 mt-4">
                  {LIST_FILTERS.map((filter) => (
                    <div
                      title={filter.name}
                      key={filter.id}
                      className={cx(
                        "h-full cursor-pointer p-2 text-white rounded-md text-sm font-bold flex items-center justify-center",
                        {
                          "bg-primary": filter.id === selectedFilter?.id,
                          "bg-new-black border-[1px] border-white": filter.id !== selectedFilter?.id,
                        },
                      )}
                      onClick={() => {
                        setSelectedFilter(filter);
                        if (!selectedSurvey && tempSelectedSurvey) {
                          setTempSelectedSurvey(undefined);
                        }
                      }}
                    >
                      {filter.icon}
                    </div>
                  ))}
                </div>
                <span className="cursor-pointer" onClick={reset}>
                  Reset
                </span>
              </div>
              <div className="w-full h-px bg-slate-200" />
              <div className="h-full">
                {!selectedFilter?.value && (
                  <div className="h-full flex items-center justify-center">Silahkan Pilih Button Filter</div>
                )}
                {selectedFilter?.value === "persebaran" && <ListOccupations />}
                {selectedFilter?.value === "tematik" && <ListSurveys />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedSurveyQuestion && (
        <div className="absolute left-[380px] top-[28px] p-6 bg-[#FFFFFF90] rounded-sm flex gap-3">
          <div className="flex flex-col gap-2 w-[150px]">
            <div className="text-sm">Negara</div>
            <div className="text-xs font-bold">Indonesia</div>
          </div>
          <div className="w-[1px] bg-black h-[44px]" />
          <div className="flex flex-col gap-2 w-[150px]">
            <div className="text-sm">Provinsi</div>
            <div className="flex justify-between cursor-pointer">
              <Listbox
                value={tempSelectedSurvey}
                onChange={(value) => {
                  if (value === 0) {
                    setKabkotGeom({});
                    return setSelectedProvince({});
                  }
                  setSelectedProvince(mappedProvinces[value]);
                }}
              >
                <div className="relative w-full mt-[-6px]">
                  <Listbox.Button className="relative w-full cursor-pointer text-sm text-left">
                    <span className="block truncate text-xs font-bold">{selectedProvince?.name || "-"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <BsCaretDownFill className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-new-black-secondary border-[1px] border-white text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        key={0}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                            active && "font-bold"
                          } hover:bg-gray-50 hover:text-new-black-secondary`
                        }
                        value={0}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block ${selected ? "font-medium" : "font-normal"}`}>-</span>
                          </>
                        )}
                      </Listbox.Option>

                      {provinces?.map((province) => (
                        <Listbox.Option
                          key={province.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                              active && "font-bold"
                            } hover:bg-gray-50 hover:text-new-black-secondary`
                          }
                          value={province.id}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block ${selected ? "font-medium" : "font-normal"}`}>
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
          </div>
          <div className="w-[1px] bg-black h-[44px]" />
          <div className="flex flex-col gap-2 w-[150px]">
            <div className="text-sm">Kabupaten</div>
            <div className="flex justify-between cursor-pointer">
              <Listbox value={tempSelectedSurvey} onChange={(value) => setSelectedKabkot(mappedListKabkot[value])}>
                <div className="relative w-full mt-[-6px]">
                  <Listbox.Button className="relative w-full cursor-pointer text-sm text-left">
                    <span className="block truncate text-xs font-bold">{selectedKabkot?.kabkot || "-"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <BsCaretDownFill className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  {!isEmpty(selectedProvince) && (
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-new-black-secondary border-[1px] border-white text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {listKabkot?.map((kabkot) => (
                          <Listbox.Option
                            key={kabkot.id_kabkot}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                                active && "font-bold"
                              } hover:bg-gray-50 hover:text-new-black-secondary`
                            }
                            value={kabkot.id_kabkot}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                  {kabkot.kabkot}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  )}
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      className="flex items-center justify-center w-[112px] h-[88px] absolute left-[62px] top-[calc(78px+56px)] bg-new-black-secondary gap-3 cursor-pointer"
      onClick={() => {
        setIsShowSidebarFilter(true);
        setSelectedFilter(LIST_FILTERS[0]);
      }}
    >
      <div className="relative">
        <MdOutlineLayers size={32} className="text-white" />
        {(selectedSurveyQuestion || Object.values(selectedOccupation).some((value) => !!value)) && (
          <div className="absolute -bottom-2 left-4 bg-blue-600 rounded-full w-4 h-4" />
        )}
      </div>
      <BsChevronRight className="text-white" strokeWidth={1.5} size={24} />
    </div>
  );
};

export default SidebarFilter;
