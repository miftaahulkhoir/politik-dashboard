import styles from "./chatBubble.module.css";
import ChatReceiverBubble from "./ChatReceiverBubble";

export default function DetailReportBubble({ setDrawerOpen, time }) {
  const chatElement = (
    <div>
      <div>Pengaduan telah disampaikan</div>
      <div className={styles.chat_link} role="button" onClick={() => setDrawerOpen(true)}>
        Lihat defail pengaduan
      </div>
    </div>
  );

  return <ChatReceiverBubble chat={chatElement} time={time} />;
}
