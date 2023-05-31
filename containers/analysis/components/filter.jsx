import { useGetKabkot, useGetProvinces } from "@/utils/services/region";

import React from "react";
import { useState } from "react";
import { BiCalendarAlt } from "react-icons/bi";
import SelectInput from "./select";

const Filter = () => {
  const [selectedProvince, setSelectedProvince] = useState({
    id: null,
    label: "-",
  });
  const [selectedKabkot, setSelectedKabkot] = useState({
    id: "",
    label: "-",
  });

  const { data: provinces } = useGetProvinces({
    select: (data) => {
      const mappedData = data?.map((list) => ({
        id: list?.id,
        label: list?.name,
      }));

      return [
        {
          id: null,
          label: "-",
        },
        ...mappedData,
      ];
    },
  });

  const { data: listKabkot } = useGetKabkot(selectedProvince?.id, {
    select: (data) => {
      const mappedData = data?.map((list) => ({
        id: list?.id,
        label: list?.kabkot,
      }));

      return [
        {
          id: null,
          label: "-",
        },
        ...mappedData,
      ];
    },
    enabled: !!selectedProvince?.id,
  });

  return (
    <div className="w-full h-[169px] bg-[#E5EAEE] px-16 flex items-center justify-between ">
      <div className="sort-data h-[82px] w-[629px] bg-white rounded flex items-center px-5 gap-3">
        <div className="flex flex-col gap-2 w-[80px]">
          <div className="text-sm">Negara</div>
          <div className="text-xs font-bold">Indonesia</div>
        </div>
        <div className="w-[1px] bg-black h-[44px] mx-3" />
        <div className="flex flex-col w-[100px]">
          <div className="text-sm text-[#7B7B7B]">Provinsi</div>
          <div className="flex justify-between cursor-pointer">
            <SelectInput
              options={provinces || [{}]}
              selectedOption={selectedProvince}
              setSelectedOption={(data) => {
                setSelectedKabkot({
                  id: null,
                  label: "-",
                });
                setSelectedProvince(data);
              }}
            />
          </div>
        </div>
        <div className="w-[1px] bg-black h-[44px] mx-3" />
        <div className="flex flex-col  w-[100px]">
          <div className="text-sm text-[#7B7B7B]">Kabupaten</div>
          <div className="flex justify-between cursor-pointer">
            <SelectInput
              disabled={selectedProvince?.id === null}
              options={listKabkot || [{}]}
              selectedOption={selectedKabkot}
              setSelectedOption={(data) => setSelectedKabkot(data)}
            />
          </div>
        </div>
        <div className="w-[1px] bg-black h-[44px] mx-3" />

        <div className="ml-auto">
          <button className="bg-[#4F5FC7] w-[125px] h-[32px] text-white rounded font-semibold py-[6px] px-[32px] flex items-center justify-center">
            Terapkan
          </button>
        </div>
      </div>

      <div className="date-data h-[65px] w-[187px] bg-white rounded flex">
        <div className="flex h-full w-full items-center px-5 gap-4">
          <BiCalendarAlt size={20} color="black" />
          <div className="flex flex-col">
            <p className="text-sm text-[#7B7B7B]">Bulanan</p>
            <p className="text-sm text-[ #121212]">Mei 2020</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
