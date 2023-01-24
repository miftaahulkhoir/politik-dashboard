import ReportChatBubble from "./reportChatBubble/ReportChatBubble";
import ReportChatHeader from "./ReportChatHeader";
import ReportChatInputBar from "./ReportChatInputBar";

export default function ReportChatContainer() {
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
      <ReportChatHeader name="Ananda Pratama" />
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
        <ReportChatBubble type="system" chat="Jumat, 30 Desember 2022" />
        <ReportChatBubble
          type="sender"
          time={new Date()}
          chat="ngga masuk akal coy buat clone whatsapp deadline 2 hari"
        />
        <ReportChatBubble type="sender" time={new Date()} chat="p login" />
        <ReportChatBubble type="receiver" time={new Date()} chat="halo bang,, login" />
      </div>
      <ReportChatInputBar />
    </div>
  );
}
