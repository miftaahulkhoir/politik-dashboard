import { useMemo } from "react";

import Card from "../card/Card";

export default function SummaryCard({ title, subtitle, number, stat }) {
  const percentage = useMemo(() => {
    const value = stat * 100;
    const isPositive = stat >= 0;
    const text = (isPositive ? value.toFixed(1) : value.toFixed(1) * -1) + "%";
    return { value, text, isPositive };
  }, [stat]);

  const numberSummary = useMemo(() => {
    const summary = {
      M: 1000000000,
      jt: 1000000,
      rb: 1000,
    };

    for (const s in summary) {
      if (number > summary[s]) {
        return parseInt(number / summary[s]) + s + "+";
      }
    }

    return number;
  }, [number]);

  return (
    <Card>
      <div className="d-flex justify-content-between align-items-baseline" style={{ color: "#7287A5" }}>
        <div style={{ fontSize: "16px", fontWeight: 600 }}>{title}</div>
        <div>{subtitle}</div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-8">
        <div className="fw-semibold" style={{ fontSize: "36px", fontWeight: 600 }}>
          {numberSummary}
        </div>
        <div
          className="px-3 py-6"
          style={{
            borderRadius: "8px",
            backgroundColor: percentage.isPositive ? "#DCFCE7" : "#FEE2E2",
            color: percentage.isPositive ? "#2EB263" : "#B12E2E",
          }}
        >
          {percentage.text}
        </div>
      </div>
    </Card>
  );
}
