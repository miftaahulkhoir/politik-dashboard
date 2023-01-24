import { useMemo } from "react";

import ChatReceiverBubble from "./ChatReceiverBubble";
import ChatSenderBubble from "./ChatSenderBubble";
import ChatSystemBubble from "./ChatSystemBubble";

// type = sender | receiver | system
export default function ReportChatBubble({ type = "sender", chat, time, sent, read }) {
  const formattedTime = useMemo(() => {
    const date = new Date(time);
    const hh = date.getHours();
    const mm = date.getMinutes();
    return hh + ":" + mm;
  }, [time]);

  if (type === "sender") {
    return <ChatSenderBubble time={formattedTime} chat={chat} sent={sent} read={read} />;
  }

  if (type === "receiver") {
    return <ChatReceiverBubble time={formattedTime} chat={chat} sent={sent} read={read} />;
  }

  if (type === "system") {
    return <ChatSystemBubble chat={chat} />;
  }

  return null;
}
