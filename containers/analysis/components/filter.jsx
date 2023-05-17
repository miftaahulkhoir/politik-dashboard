import React from "react";
import { BiCalendarAlt } from "react-icons/bi";
import SelectInput from "./select";

const provinsiOptions = [
  { id: 1, label: "Aceh" },
  { id: 2, label: "Bali" },
  { id: 3, label: "Banten" },
  { id: 4, label: "Bengkulu" },
  { id: 5, label: "Gorontalo" },
  { id: 6, label: "DKI Jakarta" },
  { id: 7, label: "Jambi" },
  { id: 8, label: "Jawa Barat" },
  { id: 9, label: "Jawa Tengah" },
  { id: 10, label: "Jawa Timur" },
];

const kabupatenOptions = [
  { id: 1, label: "Kabupaten Bandung" },
  { id: 2, label: "Kabupaten Bandung Barat" },
  { id: 3, label: "Kabupaten Bekasi" },
  { id: 4, label: "Kabupaten Bogor" },
  { id: 5, label: "Kabupaten Ciamis" },
  { id: 6, label: "Kabupaten Cianjur" },
  { id: 7, label: "Kabupaten Cirebon" },
  { id: 8, label: "Kabupaten Garut" },
  { id: 9, label: "Kabupaten Indramayu" },
  { id: 10, label: "Kabupaten Karawang" },
];

const kecamatanOptions = [
  { id: 1, label: "Kecamatan Andir" },
  { id: 2, label: "Kecamatan Astana Anyar" },
  { id: 3, label: "Kecamatan Antapani" },
  { id: 4, label: "Kecamatan Arcamanik" },
  { id: 5, label: "Kecamatan Babakan Ciparay" },
  { id: 6, label: "Kecamatan Bandung Kidul" },
  { id: 7, label: "Kecamatan Bandung Kulon" },
  { id: 8, label: "Kecamatan Bandung Wetan" },
  { id: 9, label: "Kecamatan Batununggal" },
  { id: 10, label: "Kecamatan Bojongloa Kaler" },
];

const desaOptions = [
  { id: 1, label: "Bojong Gede" },
  { id: 2, label: "Citayam" },
  { id: 3, label: "Rawa Panjang" },
  { id: 4, label: "Rawa pendek" },
];

const Filter = () => {
  return (
    <div className="w-full h-[169px] bg-[#E5EAEE] px-16 flex items-center justify-between ">
      <div className="sort-data h-[82px] w-[909px] bg-white rounded flex items-center px-5 gap-3">
        <div className="flex flex-col gap-2 w-[80px]">
          <div className="text-sm">Negara</div>
          <div className="text-xs font-bold">Indonesia</div>
        </div>
        <div className="w-[1px] bg-black h-[44px] mx-3" />
        <div className="flex flex-col w-[100px]">
          <div className="text-sm text-[#7B7B7B]">Provinsi</div>
          <div className="flex justify-between cursor-pointer">
            <SelectInput options={provinsiOptions} selectedOption={provinsiOptions[0]} />
          </div>
        </div>
        <div className="w-[1px] bg-black h-[44px] mx-3" />
        <div className="flex flex-col  w-[100px]">
          <div className="text-sm text-[#7B7B7B]">Kabupaten</div>
          <div className="flex justify-between cursor-pointer">
            <SelectInput options={kabupatenOptions} selectedOption={kabupatenOptions[0]} />
          </div>
        </div>
        <div className="w-[1px] bg-black h-[44px] mx-3" />
        <div className="flex flex-col  w-[100px]">
          <div className="text-sm text-[#7B7B7B]">Kecamatan</div>
          <div className="flex justify-between cursor-pointer">
            <SelectInput options={kecamatanOptions} selectedOption={kecamatanOptions[0]} />
          </div>
        </div>
        <div className="w-[1px] bg-black h-[44px] mx-3" />
        <div className="flex flex-col max-w-[100px]">
          <div className="text-sm text-[#7B7B7B]">Desa</div>
          <div className="!max-w-[100px]">
            <SelectInput options={desaOptions} selectedOption={desaOptions[0]} />
          </div>
        </div>

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
