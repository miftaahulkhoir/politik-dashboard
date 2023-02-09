import { Button, Col, DatePicker, Grid, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";

export default function SurveySearchBar({
  filterSearchHandler,
  filterActiveHandler,
  filterDateHandler,
  occupationLevel,
  addSurveyHandler,
}) {
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
            <Select
              defaultValue="-1"
              style={{ width: "100%" }}
              onChange={filterActiveHandler}
              options={[
                {
                  value: "-1",
                  label: "Semua",
                },
                {
                  value: "1",
                  label: "Aktif",
                },
                {
                  value: "0",
                  label: "Tidak aktif",
                },
              ]}
            />
          </Col>
          <Col span={isSM ? 24 : 8}>
            <DatePicker style={{ width: "100%" }} placeholder="Tanggal" onChange={filterDateHandler} />
          </Col>
        </Row>
      </Col>
      {occupationLevel === 1 ? (
        <Col>
          <Button icon={<TbPlus />} type="primary" onClick={addSurveyHandler}>
            Tambah Survei
          </Button>
        </Col>
      ) : null}
    </Row>
  );
}
