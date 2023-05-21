import { Button, Col, DatePicker, Grid, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";

export default function UserSearchBar({ filterSearchHandler, filterDateHandler, filterGenderHandler, addUserHandler }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

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
    <Row justify="space-between" style={{ rowGap: "8px" }}>
      <Col span={isSM ? 24 : 18}>
        <Row gutter={16} style={{ rowGap: "8px" }}>
          <Col span={isSM ? 24 : 8}>
            <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
          </Col>
          <Col span={isSM ? 24 : 8}>
            <DatePicker style={{ width: "100%" }} placeholder="Tanggal pendaftaran" onChange={filterDateHandler} />
          </Col>
          <Col span={isSM ? 24 : 8}>
            <Select defaultValue="" style={{ width: "100%" }} options={genderOptions} onChange={filterGenderHandler} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button className="btn-primary" icon={<TbPlus />} onClick={addUserHandler}>
          Tambah Pengguna
        </Button>
      </Col>
    </Row>
  );
}
