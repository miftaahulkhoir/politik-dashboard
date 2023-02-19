import { Card, Checkbox, Collapse, Space } from "antd";

import capitalizeWords from "../../../../../utils/helpers/capitalizeWords";
import { useFindAllReportCategories } from "../../../../../utils/services/reports";

function FilterPopup({ setIndexShownReportCategories }) {
  const { categories: reportCategories } = useFindAllReportCategories();

  const categoryChangeHandler = (value) => {
    setIndexShownReportCategories(value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", minWidth: "320px" }}>
      <Card
        style={{ background: "white" }}
        bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)" }}
        title="Persebaran"
        size="small"
      >
        <Space direction="vertical" size={12}>
          <Collapse defaultActiveKey={[1]}>
            <Collapse.Panel header="Pengaduan" key={1}>
              <Checkbox.Group style={{ width: "100%" }} onChange={categoryChangeHandler}>
                <Space direction="vertical" size="small">
                  {reportCategories?.map((category) => (
                    <Checkbox value={category?.id} key={category?.id}>
                      {capitalizeWords(category?.category_name ?? "")}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Collapse.Panel>
          </Collapse>
        </Space>
      </Card>
      {/* <Button type="primary" block>
        Petakan
      </Button> */}
    </div>
  );
}

export default FilterPopup;
