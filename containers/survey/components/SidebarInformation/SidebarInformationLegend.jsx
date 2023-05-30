import { useContext, useState } from "react";
import { SurveyMapContext } from "../../SurveyMapContext";
import fetchOccupations from "../../data/occupations";

const profileImages = [
  "/images/map/markers/user-koordinator.svg",
  "/images/map/markers/user-relawan.svg",
  "/images/map/markers/user-pemilih.svg",
  "/images/map/markers/user-blacklist.svg",
];

const SidebarInfromationLegend = () => {
  const { selectedSurveyQuestion, selectedOccupation } = useContext(SurveyMapContext);

  const [hoverLegendIndex, setHoverLegendIndex] = useState();

  return (
    <div>
      <div className="p-3">
        <span className="font-bold">Legenda</span>
      </div>
      <div className="w-full h-px bg-[#7287A5]" />
      <div className="flex flex-col gap-4 mt-4 overflow-auto max-h-[calc(100vh-550px)] w-full max-h p-3">
        {selectedSurveyQuestion?.options?.map((option, index) => {
          return (
            <div key={option.id} className="flex items-center gap-2 justify-between cursor-pointer">
              <span
                className="text-sm"
                style={{ color: hoverLegendIndex === index ? selectedSurveyQuestion.colors[index] : undefined }}
                onMouseEnter={() => setHoverLegendIndex(index)}
                onMouseLeave={() => setHoverLegendIndex(undefined)}
              >
                {option.option_name}
              </span>
              <div
                style={{
                  borderRadius: "4px",
                  background: selectedSurveyQuestion.colors[index],
                  minWidth: "30px",
                  width: "30px",
                  height: "20px",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              />
            </div>
          );
        })}
        {Boolean(Object.values(selectedOccupation).filter((item) => item).length) && (
          <>
            {fetchOccupations
              ?.filter((occupation) => occupation.level != 1)
              ?.map((occupation, index) => {
                if (!selectedOccupation[occupation.level]) return;
                return (
                  <div key={occupation.id} className="flex items-center gap-2 justify-between cursor-pointer">
                    <span className="text-sm">{occupation.name}</span>
                    <img src={profileImages[index]} alt="" className="w-6" />
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarInfromationLegend;
