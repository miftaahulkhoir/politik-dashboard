import { Button, Grid } from "antd";
import clsx from "clsx";
import { useMemo } from "react";
import styles from "./reset.module.css";

export default function ResetContainer({
  originalDataState,
  dataState,
  selectedThematicFromLegend,
  resetState,
  setThematicSurveyResponses,
  setSelectedKPUYears,
  setSelectedRegency,
}) {
  const screen = Grid.useBreakpoint();

  const isMD = useMemo(() => {
    return !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const handleClick = () => {
    dataState.setData(originalDataState.originalData);
    resetState.setIsReset(true);
    setThematicSurveyResponses([]);
    setSelectedKPUYears([]);
    setSelectedRegency();
  };

  return (
    <div className={clsx(styles.container, isMD ? styles.container_small : "")}>
      <div
        className="h-full cursor-pointer px-5 py-2 text-white rounded-md text-sm font-bold flex items-center justify-center bg-primary"
        onClick={handleClick}
      >
        Reset
      </div>
    </div>
  );
}
