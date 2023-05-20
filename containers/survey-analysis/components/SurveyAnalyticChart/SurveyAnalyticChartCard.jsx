import cx from "classnames";

export default function SurveyAnalyticChartCard({ title, children, fitTitleHeight = false }) {
  return (
    <div className="border rounded p-4">
      <div
        className={cx("font-semibold py-4", {
          "min-h-[0px]": fitTitleHeight,
          "min-h-[5em]": !fitTitleHeight,
          "h-auto": fitTitleHeight,
          "h-max": !fitTitleHeight,
        })}
      >
        {title}
      </div>

      <div className="overflow-auto">{children}</div>
    </div>
  );
}
