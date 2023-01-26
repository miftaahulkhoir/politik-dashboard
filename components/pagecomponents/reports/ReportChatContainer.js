import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

import ReportChatBubble from "./reportChatBubble/ReportChatBubble";
import ReportChatHeader from "./ReportChatHeader";
import ReportChatInputBar from "./ReportChatInputBar";

export default function ReportChatContainer({ selectedReport, setDrawerOpen }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!selectedReport?.id) return;
    axios
      .get(`/api/complaints/chat/${selectedReport?.id}`)
      .then((res) => {
        setChats(res?.data?.data || []);
      })
      .catch((err) => {});
  }, [selectedReport]);

  const getType = useCallback(
    (chat) => {
      if (chat?.sender_id === selectedReport?.sender_id) return "receiver";
      if (chat?.sender_id) return "sender";
      return "system";
    },
    [selectedReport],
  );

  // contains chats from sender, receiver, and system
  const allChats = useMemo(() => {
    const chatsWithDate = chats.map((chat) => {
      const date = new Date(chat?.created_at);

      chat.date = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
      return chat;
    });

    const dates = [...new Set(chatsWithDate.map((c) => c.date))];

    dates.forEach((date) => {
      const id = chatsWithDate.findIndex((chat) => chat.date === date);
      chatsWithDate.splice(id, 0, { date: date });
    });

    const categorizedChats = chatsWithDate.map((chat) => {
      chat.type = getType(chat);
      if (chat.type === "system") {
        chat.message = chat.date;
      }
      return chat;
    });

    categorizedChats.splice(1, 0, {
      type: "detail",
      created_at: selectedReport?.created_at,
    });

    console.log("chats", categorizedChats);

    return categorizedChats;
  }, [chats, getType, selectedReport?.created_at]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid #EEEEEE",
      }}
    >
      <ReportChatHeader name={selectedReport?.sender_name} />
      <div
        style={{
          width: "100%",
          background: "#FAFAFB",
          flexGrow: 1,
          height: "calc(100vh - 300px)",
          overflow: "auto",
          padding: "16px",
        }}
      >
        {allChats.map((chat) => {
          return (
            <ReportChatBubble
              key={chat?.id}
              type={chat?.type}
              time={chat?.created_at}
              chat={chat?.message}
              imgUrl={chat?.link_image}
              setDrawerOpen={setDrawerOpen}
            />
          );
        })}
      </div>
      <ReportChatInputBar />
    </div>
  );
}
