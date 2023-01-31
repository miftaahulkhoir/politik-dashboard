import { Col, DatePicker, Input, Row, Select } from "antd";
import { useMemo } from "react";
import { TbSearch } from "react-icons/tb";

import capitalizeWords from "../../../utils/helpers/capitalizeWords";

export default function ReportSearchBar({ filterSearchHandler, filterCategoryHandler, filterDateHandler, categories }) {
  const categoryOptions = useMemo(() => {
    const newCategories = categories.map((category) => ({
      label: capitalizeWords(category.category_name),
      value: category.id,
    }));
    newCategories.unshift({
      label: "Semua",
      value: "",
    });
    return newCategories;
  }, [categories]);

  return (
    <Row justify="" gutter={16}>
      <Col span={6}>
        <Input placeholder="Pencarian" prefix={<TbSearch />} onChange={filterSearchHandler} />
      </Col>
      <Col span={6}>
        <Select defaultValue="" style={{ width: "100%" }} options={categoryOptions} onChange={filterCategoryHandler} />
      </Col>
      <Col span={6}>
        <DatePicker style={{ width: "100%" }} placeholder="Tanggal" onChange={filterDateHandler} />
      </Col>
    </Row>
  );
}
