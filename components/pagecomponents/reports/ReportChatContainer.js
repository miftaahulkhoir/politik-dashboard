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
        <ReportChatBubble type="sender" time={new Date()} chat="gg gemink" read />
        <ReportChatBubble
          type="sender"
          time={new Date()}
          chat="Cauliflower cheese rubber cheese cheese on toast. Cottage cheese cow lancashire st. agur blue cheese ricotta mozzarella jarlsberg blue castello. Airedale camembert de normandie queso cheesecake manchego lancashire squirty cheese pecorino. Cheese slices emmental cow camembert de normandie cheddar stinking bishop."
          read
        />
        <ReportChatBubble type="receiver" time={new Date()} chat="halo bang,, login" />
        <ReportChatBubble type="sender" time={new Date()} chat="masuk bang" sent />
        <ReportChatBubble type="sender" time={new Date()} chat="hahaha" />
        <ReportChatBubble type="sender" time={new Date()} chat="p login" />
      </div>
      <ReportChatInputBar />
    </div>
  );
}
