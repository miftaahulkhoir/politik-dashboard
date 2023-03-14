import { Card, Col, Divider, Input, Row, Select, Typography } from "antd";
import { useCallback, useMemo } from "react";

import defaultSurveyQuestion from "../../../utils/constants/defaultSurveyQuestion";
import DropdownInputEditable from "../../elements/input/DropdownInputEditable";
import MultiRadioEditable from "../../elements/input/MultiRadioEditable";
import YesNoQuestion from "../../elements/input/YesNoQuestion";

export default function SentimentFormCard({ index, keywords, setKeywords, isSM }) {
  return (
    <Card style={{ margin: "24px" }}>
      <Row style={{ gap: "16px", flexDirection: isSM ? "column-reverse" : "row" }}>
        <Col span={isSM ? 24 : 16}>
          <Typography.Title level={5}>Keyword</Typography.Title>
          <Input.TextArea
            rows={2}
            value={keywords[index].text}
            onChange={(e) => {
              const newKeywords = [...keywords];
              newKeywords[index].text = e.target.value;
              setKeywords([...newKeywords]);
            }}
          />
        </Col>
        <Col span={isSM ? 24 : 8}>
          <Typography.Title level={5}>Boolean</Typography.Title>
          <Select
            placeholder="Masukkan boolean"
            style={{ width: "165px" }}
            options={[
              {
                value: "may",
                label: "MAY",
              },
              {
                value: "not",
                label: "NOT",
              },
              {
                value: "must",
                label: "MUST",
              },
            ]}
            value={keywords[index].clause}
            onChange={(value) => {
              const newKeywords = [...keywords];
              newKeywords[index].clause = value;
              setKeywords([...newKeywords]);
            }}
          />
        </Col>
        <Col span={isSM ? 24 : 8}>
          <Typography.Title level={5}>Case sensitive</Typography.Title>
          <Select
            placeholder="Case sensitive"
            style={{ width: "165px" }}
            options={[
              {
                value: false,
                label: "False",
              },
              {
                value: true,
                label: "True",
              },
            ]}
            value={keywords[index].case_sensitive}
            onChange={(value) => {
              const newKeywords = [...keywords];
              newKeywords[index].case_sensitive = value;
              console.log("query no.", index, newKeywords);
              setKeywords([...newKeywords]);
            }}
          />
        </Col>
      </Row>
      <Divider />
    </Card>
  );
}
