import fetchOccupations from "../../data/occupations";
import { useContext } from "react";
import { SurveyMapContext } from "../../SurveyMapContext";

const ListOccupations = () => {
  const profileImages = [
    "/images/map/markers/user-koordinator.svg",
    "/images/map/markers/user-relawan.svg",
    "/images/map/markers/user-pemilih.svg",
    "/images/map/markers/user-blacklist.svg",
  ];

  const { selectedOccupation, setSelectedOccupation } = useContext(SurveyMapContext);

  const onChange = (event) => {
    setSelectedOccupation((prev) => {
      const clonePrev = { ...prev };
      return { ...clonePrev, [event.target.value]: event.target.checked };
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {fetchOccupations
        ?.filter((occupation) => occupation.level != 1)
        ?.map((occupation, index) => (
          <div key={occupation.id} className="flex items-center gap-3">
            <img src={profileImages[index]} alt="" className="w-8" />
            <label htmlFor={occupation.id} className="cursor-pointer flex items-center">
              <input
                name="occupation"
                id={occupation.id}
                type="checkbox"
                value={occupation.level}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                checked={!!selectedOccupation?.[occupation.level]}
                onChange={(event) => onChange(event)}
              />
              <span className="ml-2 text-sm text-white cursor-pointer">{occupation.name}</span>
            </label>
          </div>
        ))}
    </div>
  );
};

export default ListOccupations;
