import clsx from "clsx";

import styles from "./chatBubble.module.css";

export default function ChatSystemBubble({ chat }) {
  return (
    <div className={clsx(styles.chat_wrapper, styles.chat_wrapper_system)}>
      <div wrap={false} className={styles.chat_system} gutter={8}>
        {chat}
      </div>
    </div>
  );
}
