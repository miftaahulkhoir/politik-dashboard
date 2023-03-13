import { Button, Col, DatePicker, Grid, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { TbPencil, TbPlus, TbSearch } from "react-icons/tb";

export default function SentimentSearchBar({
  filterSearchHandler,
  filterActiveHandler,
  filterDateHandler,
  occupationLevel,
  addSurveyHandler,
  editOrganizationHandler,
}) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  return (
    <Row justify="space-between" style={{ rowGap: "8px" }}>
      <Col span={isSM ? 24 : 16}>
        <Row gutter={16} style={{ rowGap: "8px" }}>
          <Col span={isSM ? 24 : 8}>
            <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
          </Col>
        </Row>
      </Col>
      {occupationLevel === 1 ? (
        <Col>
          <Row gutter={16}>
            <Col>
              <Button icon={<TbPlus />} type="primary" onClick={addSurveyHandler}>
                Tambah Group
              </Button>
            </Col>
            <Col>
              <Button icon={<TbPencil />} type="primary" onClick={editOrganizationHandler}>
                Ubah Organisasi
              </Button>
            </Col>
          </Row>
        </Col>
      ) : null}
    </Row>
  );
}
