import { Col, Row, Space } from "antd";
import clsx from "clsx";
import { TbCheck, TbChecks } from "react-icons/tb";

import styles from "./chatBubble.module.css";

export default function ChatSenderBubble({ chat, time, sent = false, read = false, imgUrl }) {
  return (
    <div className={clsx(styles.chat_wrapper, styles.chat_wrapper_sender)}>
      <div className={styles.chat_sender}>
        {imgUrl ? <img className={styles.chat_image} src={imgUrl} alt="ppp" /> : null}

        <Row wrap={false} gutter={8}>
          <Col>{chat}</Col>
          <Col>
            <Space style={{ fontSize: "12px", color: "#7287A5" }}>
              <div>{time}</div>
              {read ? <TbChecks color="#016CEE" size={16} /> : sent ? <TbChecks size={16} /> : <TbCheck size={16} />}
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}
