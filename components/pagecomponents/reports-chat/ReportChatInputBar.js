import { Button, Col, Row } from "antd";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { TbPhoto, TbSend } from "react-icons/tb";

import styles from "./report.module.css";

export default function ReportChatInputBar() {
  const [text, setText] = useState("");

  const isEmpty = useMemo(() => {
    // default if empty of contenteditable is \n
    return text === "\n";
  }, [text]);

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
          <div
            contentEditable
            className={clsx(styles.chat_input, isEmpty ? styles.chat_input_empty : "")}
            onInput={(e) => {
              setText(e.target.innerText);
            }}
          ></div>
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
