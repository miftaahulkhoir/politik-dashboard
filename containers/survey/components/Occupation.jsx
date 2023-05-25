import { Card, Checkbox, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import capitalize from "lodash/capitalize";
import fetchOccupations from "../data/occupations";
import { SurveyMapContext } from "../SurveyMapContext";

const Occupation = () => {
  const profileImages = [
    "/images/map/markers/user-koordinator.svg",
    "/images/map/markers/user-relawan.svg",
    "/images/map/markers/user-pemilih.svg",
    "/images/map/markers/user-blacklist.svg",
  ];
  const [occupations, setOccupations] = useState([]);

  const { selectedOccupation, setSelectedOccupation } = useContext(SurveyMapContext);
  useEffect(() => {
    if (!fetchOccupations?.length) return;
    setOccupations(fetchOccupations.filter((o) => o.level != 1));
  }, [fetchOccupations]);

  const userChangeHandler = (value) => {
    setSelectedOccupation(value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", width: "200px" }}>
      <Card style={{ background: "#151922" }} title={<div className="text-white">Persebaran</div>} size="small">
        <Checkbox.Group style={{ width: "100%" }} onChange={userChangeHandler} value={selectedOccupation}>
          <Space direction="vertical" size="small">
            {occupations?.map((occupation, i) => (
              <Checkbox value={occupation?.level} key={occupation?.level} className="text-white">
                <Space size={4}>
                  <img src={profileImages[i]} alt="" style={{ width: "20px" }} />
                  {capitalize(occupation?.name ?? "")}
                </Space>
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Card>
    </div>
  );
};

export default Occupation;
