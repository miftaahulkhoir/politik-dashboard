import { Card, Checkbox, Collapse, Space } from "antd";
import { useEffect, useState } from "react";

import capitalizeWords from "../../../../../utils/helpers/capitalizeWords";
import { useFindAllReportCategories } from "../../../../../utils/services/reports";
import { useFindAllOccupations } from "../../../../../utils/services/users";

function FilterPopup({ showUsers, stateSelected }) {
  // reports
  const { categories: reportCategories } = useFindAllReportCategories();
  const categoryChangeHandler = (value) => {
    stateSelected.setSelectedReportCategories(value);
  };

  // users
  const { occupations: fetchOccupations } = useFindAllOccupations();
  const [occupations, setOccupations] = useState([]);
  useEffect(() => {
    if (!fetchOccupations?.length) return;
    setOccupations(fetchOccupations.filter((o) => o.level != 1));
  }, [fetchOccupations]);

  const userChangeHandler = (value) => {
    stateSelected.setSelectedOccupations(value);
    if (value.includes(2)) {
      showUsers.setShowKoordinator(true);
    } else {
      showUsers.setShowKoordinator(false);
    }

    if (value.includes(3)) {
      showUsers.setShowRelawan(true);
    } else {
      showUsers.setShowRelawan(false);
    }

    if (value.includes(4)) {
      showUsers.setShowPemilih(true);
    } else {
      showUsers.setShowPemilih(false);
    }

    if (value.includes(5)) {
      showUsers.setShowBlackList(true);
    } else {
      showUsers.setShowBlackList(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", width: "200px" }}>
      <Card
        style={{ background: "white" }}
        bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)" }}
        title="Persebaran"
        size="small"
      >
        <Space direction="vertical" size={12}>
          <Collapse defaultActiveKey={[1]}>
            <Collapse.Panel header="Persebaran" key={1}>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={userChangeHandler}
                value={stateSelected.selectedOccupations}
              >
                <Space direction="vertical" size="small">
                  {occupations?.map((occupation) => (
                    <Checkbox value={occupation?.level} key={occupation?.level}>
                      {capitalizeWords(occupation?.name ?? "")}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Collapse.Panel>
          </Collapse>

          <Collapse defaultActiveKey={[1]}>
            <Collapse.Panel header="Pengaduan" key={1}>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={categoryChangeHandler}
                value={stateSelected?.selectedReportCategories}
              >
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
