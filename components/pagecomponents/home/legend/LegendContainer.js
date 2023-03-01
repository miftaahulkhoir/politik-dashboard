import { Card, Grid, Space } from "antd";
import clsx from "clsx";
import { useMemo } from "react";
import LegendItem from "./LegendItem";
import styles from "./legend.module.css";

export default function LegendContainer() {
  const screen = Grid.useBreakpoint();

  const isMD = useMemo(() => {
    return !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  return (
    <div className={clsx(styles.container, isMD ? styles.container_small : "")}>
      <Card
        size="small"
        title="Legenda"
        style={{ width: "240px" }}
        headStyle={{ textAlign: "right" }}
        bodyStyle={{ textAlign: "right", overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}
        className={styles.contents_container}
      >
        <Space direction="vertical">
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggg" />
          <LegendItem color="blue" text="wwwwwwwwwwwwwwwwwwwwwwww wwggggwwwwwwwwwwwwwwwwßwwwwwwwwwwwwgggg" />
        </Space>
      </Card>
    </div>
  );
}
