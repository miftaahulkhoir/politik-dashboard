import { Card, Radio } from "antd";
import { useState } from "react";

const Region = () => {
  const [selectedRegionLevel, setSelectedRegionLevel] = useState();
  return (
    <Card
      style={{ background: "#151922" }}
      title={<div className="text-white">Level Daerah</div>}
      size="small"
      className="text-white"
    >
      <Radio.Group
        style={{ width: "100%" }}
        value={selectedRegionLevel}
        onChange={(e) => setSelectedRegionLevel(e.target.value)}
      >
        <div className="flex flex-col gap-2 text-white">
          <Radio className="text-white" value={1}>
            Kelurahan
          </Radio>
          <Radio className="text-white" value={2}>
            Kecamatan
          </Radio>
        </div>
      </Radio.Group>
    </Card>
  );
};
export default Region;
