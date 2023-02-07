import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import { TbPlus, TbSearch } from "react-icons/tb";

export default function UserSearchBar({ filterSearchHandler, filterDateHandler, filterGenderHandler, addUserHandler }) {
  const genderOptions = [
    {
      label: "Semua Jenis Kelamin",
      value: "",
    },
    {
      label: "Laki-laki",
      value: "male",
    },
    {
      label: "Perempuan",
      value: "female",
    },
  ];

  return (
    <Row justify="space-between">
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
          </Col>
          <Col span={8}>
            <DatePicker style={{ width: "100%" }} placeholder="Tanggal pendaftaran" onChange={filterDateHandler} />
          </Col>
          <Col span={8}>
            <Select defaultValue="" style={{ width: "100%" }} options={genderOptions} onChange={filterGenderHandler} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button icon={<TbPlus />} type="primary" onClick={addUserHandler}>
          Tambah Pengguna
        </Button>
      </Col>
    </Row>
  );
}
