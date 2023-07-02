import { Col, DatePicker, Grid, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { TbSearch } from "react-icons/tb";

export default function IssueSearchBar({ filterSearchHandler, filterDateHandler, filterIssueHandler, issueOptions }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  return (
    <Row justify="space-between" style={{ rowGap: "8px" }}>
      <Col span={isSM ? 24 : 18}>
        <Row gutter={16} style={{ rowGap: "8px" }}>
          <Col span={isSM ? 24 : 6}>
            <Input placeholder="Pencarian Nama" prefix={<TbSearch />} onChange={filterSearchHandler} />
          </Col>
          <Col span={isSM ? 24 : 6}>
            <Select defaultValue="" style={{ width: "100%" }} options={issueOptions} onChange={filterIssueHandler} />
          </Col>

          <Col span={isSM ? 24 : 6}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Semua Tahun"
              onChange={filterDateHandler}
              picker="year"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
