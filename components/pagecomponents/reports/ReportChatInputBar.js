import { Button, Col, Row } from "antd";
import { TbPhoto, TbSend } from "react-icons/tb";

import styles from "./report.module.css";

export default function ReportChatInputBar() {
  return (
    <div style={{ padding: "16px", borderTop: "1px solid #EEEEEE", background: "#F3F3F6" }}>
      <Row wrap={false} gutter={8} align="bottom">
        <Col>
          <div style={{ height: "37px", display: "grid", placeItems: "center" }}>
            <Button
              type="text"
              icon={<TbPhoto size={20} />}
              shape="circle"
              style={{ background: "white", color: "black" }}
            ></Button>
          </div>
        </Col>
        <Col flex={1}>
          <div contentEditable className={styles.chat_input}>
            p login bang
          </div>
        </Col>
        <Col>
          <div style={{ height: "37px", display: "grid", placeItems: "center" }}>
            <Button type="primary" icon={<TbSend size={20} />} shape="circle"></Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
