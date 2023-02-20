import { Col, DatePicker, Grid, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { TbSearch } from "react-icons/tb";

import reportStatuses from "../../../utils/constants/reportStatuses";
import capitalizeWords from "../../../utils/helpers/capitalizeWords";

export default function ReportSearchBar({
  filterSearchHandler,
  filterCategoryHandler,
  filterDateHandler,
  filterStatusHandler,
  categories,
  // statuses,
}) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const categoryOptions = useMemo(() => {
    const newCategories = categories.map((category) => ({
      label: capitalizeWords(category.category_name),
      value: category.id,
    }));
    newCategories.unshift({
      label: "Semua Kategori",
      value: "",
    });
    return newCategories;
  }, [categories]);

  const statusOptions = useMemo(() => {
    const newStatuses = [];

    for (const [id, status] of Object.entries(reportStatuses)) {
      newStatuses.push({
        label: status.name,
        value: id,
      });
    }

    newStatuses.unshift({
      label: "Semua Status",
      value: "",
    });
    return newStatuses;
  }, []);

  return (
    <Row justify="" gutter={16} style={{ rowGap: "8px" }}>
      <Col span={isSM ? 24 : 6}>
        <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
      </Col>
      <Col span={isSM ? 24 : 6}>
        <Select defaultValue="" style={{ width: "100%" }} options={categoryOptions} onChange={filterCategoryHandler} />
      </Col>
      <Col span={isSM ? 24 : 6}>
        <DatePicker style={{ width: "100%" }} placeholder="Waktu" onChange={filterDateHandler} />
      </Col>
      <Col span={isSM ? 24 : 6}>
        <Select defaultValue="" style={{ width: "100%" }} options={statusOptions} onChange={filterStatusHandler} />
      </Col>
    </Row>
  );
}
