import { Col, Row, Space } from "antd";
import clsx from "clsx";

import styles from "./chatBubble.module.css";

export default function ChatReceiverBubble({ chat, time }) {
  return (
    <div className={clsx(styles.chat_wrapper, styles.chat_wrapper_receiver)}>
      <Row wrap={false} className={styles.chat_receiver} gutter={8}>
        <Col>{chat}</Col>
        <Col>
          <Space style={{ fontSize: "12px" }}>
            <div>{time}</div>
            <div>v</div>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
