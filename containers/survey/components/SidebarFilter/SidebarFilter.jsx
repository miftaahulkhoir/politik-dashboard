import React, { useContext, useState } from "react";

import { MdOutlineLayers } from "react-icons/md";
import { BsCaretDownFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LIST_FILTERS from "../../constants/listFilters";

import cx from "classnames";
import ListOccupations from "./ListOccupations";
import ListSurveys from "./ListSurveys";
import { SurveyMapContext } from "../../SurveyMapContext";

const SidebarFilter = () => {
  const {
    isShowSidebarFilter,
    setIsShowSidebarFilter,
    reset,
    setTempSelectedSurvey,
    selectedSurvey,
    tempSelectedSurvey,
  } = useContext(SurveyMapContext);
  const [selectedFilter, setSelectedFilter] = useState();

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
      onClick={() => {
        setIsShowSidebarFilter(true);
        setSelectedFilter(LIST_FILTERS[0]);
      }}
    >
      <div className="relative">
        <MdOutlineLayers size={32} className="text-white" />
        <div className="absolute -bottom-2 left-2 bg-blue-600 text-white px-3  text-xs rounded-full">3</div>
      </div>
      <BsChevronRight className="text-white" strokeWidth={1.5} size={24} />
    </div>
  );
};

export default SidebarFilter;
