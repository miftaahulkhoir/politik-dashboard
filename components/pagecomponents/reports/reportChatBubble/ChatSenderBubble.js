import { Col, Row, Space } from "antd";
import clsx from "clsx";
import { TbCheck, TbChecks } from "react-icons/tb";

import styles from "./chatBubble.module.css";

export default function ChatSenderBubble({ chat, time, sent = false, read = false }) {
  return (
    <div className={clsx(styles.chat_wrapper, styles.chat_wrapper_sender)}>
      <Row wrap={false} className={styles.chat_sender} gutter={8}>
        <Col>{chat}</Col>
        <Col>
          <Space style={{ fontSize: "12px" }}>
            <div>{time}</div>
            {read ? (
              <TbChecks color="#016CEE" size={16} />
            ) : sent ? (
              <TbChecks color="#7287A5" size={16} />
            ) : (
              <TbCheck color="#7287A5" size={16} />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
}
