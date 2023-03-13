import { Col, DatePicker, Grid, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { TbSearch } from "react-icons/tb";

import capitalizeWords from "../../../utils/helpers/capitalizeWords";
import { useFindAllLogisticCategories } from "../../../utils/services/logistics";

export default function LogisticSearchBar({ filterSearchHandler, filterCategoryHandler, filterDateHandler }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const { categories } = useFindAllLogisticCategories();

  const categoryOptions = useMemo(() => {
    const newCategories = categories.map((c) => ({
      label: capitalizeWords(c?.name),
      value: c?.id,
    }));

    newCategories.unshift({
      label: "Semua Kategori",
      value: "",
    });

    return newCategories;
  }, [categories]);

  return (
    <Row justify="" gutter={16} style={{ rowGap: "8px" }}>
      <Col span={isSM ? 24 : 6}>
        <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
      </Col>
      <Col span={isSM ? 24 : 6}>
        <DatePicker style={{ width: "100%" }} placeholder="Waktu" onChange={filterDateHandler} />
      </Col>
      <Col span={isSM ? 24 : 6}>
        <Select defaultValue="" style={{ width: "100%" }} options={categoryOptions} onChange={filterCategoryHandler} />
      </Col>
    </Row>
  );
}
