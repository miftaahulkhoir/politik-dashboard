import React from "react";

import { MdShowChart, MdOpenInNew } from "react-icons/md";

const LayerData = () => {
  return (
    <div className="absolute right-0 top-[134px] h-[calc(100vh-134px)] text-white">
      <div className="flex items-center bg-new-black px-[24px] h-[78px]">
        <MdShowChart size={32} />
        <span className="font-semibold text-xl">Analisis</span>
      </div>
      <div className="flex flex-col justify-between p-8 w-[329px] h-[calc(100vh-214px)] bg-new-black-secondary gap-3">
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

export default LayerData;
