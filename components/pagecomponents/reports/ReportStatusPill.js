import reportStatus from "./reportStatus";

export default function ReportStatusPill({ id }) {
  return (
    <div
      style={{
        padding: "4px 12px",
        borderRadius: "6px",
        display: "inline-block",
        fontWeight: 600,
        background: reportStatus[id]?.bgColor,
        color: reportStatus[id]?.textColor,
      }}
    >
      {reportStatus[id]?.name}
    </div>
  );
}
