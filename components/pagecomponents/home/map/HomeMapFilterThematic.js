import { Button, Card, Select, Space } from "antd";

import thematicTypes from "../../../../utils/constants/thematicTypes";

export default function HomeMapFilterThematic({ thematicType, setThematicType }) {
  return (
    <Card size="small" title="Tematik">
      <Space direction="vertical">
        <Select
          showSearch
          placeholder="Tipe"
          value={thematicType}
          onChange={(value) => {
            setThematicType(value);
          }}
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false} // jadi ngeglitch saat select
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          options={Object.keys(thematicTypes).map((typeID) => ({ label: thematicTypes[typeID].name, value: typeID }))}
        />

        {thematicType == 1 ? (
          <Select
            showSearch
            placeholder="Pilih survei"
            // value={thematicType}
            // onChange={(value) => {
            //   setThematicType(value);
            // }}
            style={{ width: "100%" }}
            dropdownMatchSelectWidth={false} // jadi ngeglitch saat select
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            // options={Object.keys(thematicTypes).map((typeID) => ({ label: thematicTypes[typeID].name, value: typeID }))}
          />
        ) : null}

        <Button
          size="small"
          type="link"
          onClick={() => {
            setThematicType(null);
          }}
        >
          Hapus filter
        </Button>
      </Space>
    </Card>
  );
}
