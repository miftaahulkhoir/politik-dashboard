import React, { Fragment, useState } from "react";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { MdOutlineLayers } from "react-icons/md";
import { BsCaretDownFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";

const listBencana = [
  { name: "Abrasi" },
  { name: "Banjir" },
  { name: "Gempa Bumi Tsunami" },
  { name: "Gempa Bumi" },
  { name: "Gunung Meletus" },
  { name: "Kebakaran Hutan" },
  { name: "Kekeringan" },
  { name: "Puting Beliung" },
  { name: "Tanah Longsor" },
];

const listKriminal = [
  { name: "PerusakanPenghancuran Barang" },
  { name: "Menggangu Tertib Umum" },
  { name: "Korupsi" },
  { name: "Penggelapan" },
  { name: "Penipuan Perbuatan Curang" },
  { name: "Narkotika Psikotropika" },
  { name: "Pembakaran Dengan Sengaja" },
  { name: "Kejahatan Pembunuhan" },
  { name: "Penganiayaan Berat" },
  { name: "Penganiayaan Ringan" },
  { name: "KDRT" },
  { name: "Pencurian Dengan Kekerasan" },
  { name: "Pencurian Senjata Api" },
  { name: "Pencurian Senjata Tajam" },
  { name: "Perkosaan" },
  { name: "Pencabulan" },
  { name: "Penculikan" },
  { name: "Mempekerjakan Anak diBawah Umur" },
  { name: "Pencurian" },
  { name: "Pencurian Dengan Pemberatan" },
  { name: "Pencurian Kendaraan Bermotor" },
  { name: "Penadahan" },
];

const issue = [
  { name: "Bencana", list: listBencana },
  { name: "Kriminalitas", list: listKriminal },
  { name: "Terorisme" },
];
const year = [{ name: "2019" }, { name: "2020" }, { name: "2021" }];

const LayerFilter = () => {
  const [isLayerOpen, setIsLayerOpen] = useState(false);

  const [selected, setSelected] = useState(issue[0]);
  const [selectedYear, setSelectedYear] = useState(year[0]);

  return isLayerOpen ? (
    <div className="absolute left-[62px] top-[calc(78px+56px)]">
      <div className="flex flex-col justify-between py-6 px-6 w-[360px] h-[calc(100vh-150px)]  bg-new-black-secondary gap-3 cursor-pointer">
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
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1 w-full">
                  <Listbox.Button className="relative w-full cursor-pointer  bg-new-black-secondary border-[1px] border-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2  ">
                    <span className="block truncate text-white font-bold">{selected.name}</span>
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
                      {issue.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                              active && "font-bold"
                            } hover:bg-gray-50 hover:text-new-black-secondary`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                {person.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <Listbox value={selectedYear} onChange={setSelectedYear}>
                <div className="relative mt-1 w-[150px]">
                  <Listbox.Button className="relative w-full cursor-pointer  bg-new-black-secondary border-[1px] border-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2  ">
                    <span className="block truncate text-white font-bold">{selectedYear.name}</span>
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
                      {year.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-3 pr-4 text-white ${
                              active && "font-bold"
                            } hover:bg-gray-50 hover:text-new-black-secondary`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                {person.name}
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
          <div className="flex flex-col p-3 gap-2">
            <div class="flex items-center mr-4">
              <input
                id="green-checkbox"
                type="checkbox"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
              />
              <label for="green-checkbox" class="ml-2 text-sm  text-white  font-bold">
                #
              </label>
              <label for="green-checkbox" class="ml-2 text-sm  text-white ">
                Semua Kejahatan
              </label>
            </div>
            {selected?.list &&
              selected.list.map((listData, i) => (
                <div class="flex items-center mr-4" key={listData.name}>
                  <input
                    id={listData.name}
                    type="checkbox"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label for={listData.name} class="ml-2 text-sm font-bold text-white ">
                    {i + 1}
                  </label>
                  <label for={listData.name} class="ml-2 text-sm text-white ">
                    {listData.name}
                  </label>
                </div>
              ))}
          </div>
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

const Menu = () => {
  return (
    <>
      <Sidebar />
      <LayerFilter />
      <TopBar />
    </>
  );
};

export default Menu;
