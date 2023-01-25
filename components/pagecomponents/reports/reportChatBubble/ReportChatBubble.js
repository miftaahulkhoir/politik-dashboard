import { useMemo } from "react";

import ChatReceiverBubble from "./ChatReceiverBubble";
import ChatSenderBubble from "./ChatSenderBubble";
import ChatSystemBubble from "./ChatSystemBubble";

import hhmm from "../../../../utils/helpers/date/hhmm";

// type = sender | receiver | system
export default function ReportChatBubble({ type = "sender", chat, time, sent, read, imgUrl }) {
  const formattedTime = useMemo(() => {
    return hhmm(time);
  }, [time]);

  if (type === "sender") {
    return <ChatSenderBubble time={formattedTime} chat={chat} sent={sent} read={read} imgUrl={imgUrl} />;
  }

  if (type === "receiver") {
    return <ChatReceiverBubble time={formattedTime} chat={chat} sent={sent} read={read} imgUrl={imgUrl} />;
  }

  if (type === "system") {
    return <ChatSystemBubble chat={chat} />;
  }

  return null;
}
