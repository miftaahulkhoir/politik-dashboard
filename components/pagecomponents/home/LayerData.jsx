import { polColor } from "@/constants/colors";
import justifiedNumber from "@/utils/helpers/getJustifiedNumber";
import React from "react";

import { MdShowChart, MdOpenInNew } from "react-icons/md";

const LayerData = ({ ranks, isRankLoading, segmented, issueId }) => {
  return (
    <div className="absolute right-0 top-[134px] h-[calc(100vh-134px)] text-white">
      <div className="flex items-center bg-new-black px-[24px] h-[78px]">
        <MdShowChart size={32} />
        <span className="font-semibold text-xl">Analisis</span>
      </div>
      <div className="flex flex-col justify-between p-8 w-[329px] h-[calc(100vh-214px)] bg-new-black-secondary gap-3">
        <div className="flex flex-col gap-3">
          {isRankLoading ? (
            <span className="font-bold text-sm">Loading ...</span>
          ) : (
            <>
              <span className="font-bold text-sm">Provinsi</span>
              <div className="flex flex-col text-sm gap-3">
                {ranks.slice(0, 5).map((rank) => (
                  <div className="flex justify-between" key={rank.id}>
                    <span>{rank.wilayah}</span>
                    <div className="flex items-center gap-1.5">
                      <span>{rank.metadata.total_incident}</span> <MdOpenInNew />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 border-t py-4">
          <span className="font-bold text-sm">Legenda</span>
          <div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 " style={{ background: `hsl(${polColor[issueId - 1]}, 93%, 56%)` }}></div>
              <span className="text-sm">{`> ${justifiedNumber(segmented[0])}`}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 " style={{ background: `hsl(${polColor[issueId - 1]}, 93%, 70%)` }}></div>
              <span className="text-sm">{`${justifiedNumber(segmented[0])} - ${justifiedNumber(segmented[1])}`}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 " style={{ background: `hsl(${polColor[issueId - 1]}, 93%, 78%)` }}></div>
              <span className="text-sm">{`${justifiedNumber(segmented[1])} - ${justifiedNumber(segmented[2])}`}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 " style={{ background: `hsl(${polColor[issueId - 1]}, 93%, 88%)` }}></div>
              <span className="text-sm">{`<${justifiedNumber(segmented[2])} - ${justifiedNumber(segmented[3])}`}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="w-5 h-5 " style={{ background: `hsl(${polColor[issueId - 1]}, 93%, 99%)` }}></div>
              <span className="text-sm">{`< ${justifiedNumber(segmented[3])}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayerData;
