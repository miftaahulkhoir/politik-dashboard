import { Card, Checkbox, Space } from "antd";

import capitalizeWords from "../../../../../utils/helpers/capitalizeWords";

function FilterPopup({ showUsers, occupationState, occupations }) {
  const profileImages = [
    "/images/map/markers/user-koordinator.svg",
    "/images/map/markers/user-relawan.svg",
    "/images/map/markers/user-pemilih.svg",
    "/images/map/markers/user-blacklist.svg",
  ];

  const userChangeHandler = (value) => {
    occupationState.setSelectedOccupations(value);
    if (value.includes(2)) {
      showUsers.setShowKoordinator(true);
    } else {
      showUsers.setShowKoordinator(false);
    }

    if (value.includes(3)) {
      showUsers.setShowRelawan(true);
    } else {
      showUsers.setShowRelawan(false);
    }

    if (value.includes(4)) {
      showUsers.setShowPemilih(true);
    } else {
      showUsers.setShowPemilih(false);
    }

    if (value.includes(5)) {
      showUsers.setShowBlackList(true);
    } else {
      showUsers.setShowBlackList(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", width: "200px" }}>
      <Card
        style={{ background: "#151922" }}
        bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)", background: "#151922" }}
        title={<span className="text-white">Persebaran</span>}
        size="small"
      >
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={userChangeHandler}
          value={occupationState.selectedOccupations}
        >
          <Space direction="vertical" size="small">
            {occupations
              ?.filter((o) => o.level != 1)
              ?.map((occupation, i) => (
                <Checkbox value={occupation?.level} key={occupation?.level}>
                  <Space size={4}>
                    <img src={profileImages[i]} alt="" style={{ width: "20px" }} />
                    <span className="text-white">{capitalizeWords(occupation?.name ?? "")}</span>
                  </Space>
                </Checkbox>
              ))}
          </Space>
        </Checkbox.Group>
      </Card>
    </div>
  );
}

export default FilterPopup;
