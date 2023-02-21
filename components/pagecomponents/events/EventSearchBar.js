import { Button, Col, DatePicker, Grid, Input, Row } from "antd";
import { useMemo } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";

export default function EventSearchBar({ filterSearchHandler, filterDateHandler, addEventHandler }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  return (
    <Row justify="space-between" style={{ rowGap: "8px" }}>
      <Col span={isSM ? 24 : 18}>
        <Row gutter={16} style={{ rowGap: "8px" }}>
          <Col span={isSM ? 24 : 8}>
            <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
          </Col>
          <Col span={isSM ? 24 : 8}>
            <DatePicker style={{ width: "100%" }} placeholder="Tanggal rilis" onChange={filterDateHandler} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Button icon={<TbPlus />} type="primary" onClick={addEventHandler}>
          Tambah Kegiatan
        </Button>
      </Col>
    </Row>
  );
}
