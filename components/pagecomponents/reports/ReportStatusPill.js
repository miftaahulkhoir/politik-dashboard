import reportStatuses from "../../../utils/constants/reportStatuses";

export default function ReportStatusPill({ id }) {
  return (
    <div
      style={{
        padding: "4px 12px",
        borderRadius: "6px",
        display: "inline-block",
        fontWeight: 600,
        background: reportStatuses[id]?.bgColor,
        color: reportStatuses[id]?.textColor,
      }}
    >
      {reportStatuses[id]?.name}
    </div>
  );
}
