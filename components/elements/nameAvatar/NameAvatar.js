import { useMemo } from "react";

import styles from "./nameAvatar.module.css";

export default function NameAvatar({ shortName, longName, style }) {
  const name = shortName
    ? shortName
    : useMemo(() => {
        const words = longName.toUpperCase().split(" ");
        if (words.length === 0) return "";
        if (words.length === 1) return words[0][0];
        return words[0][0] + words[1][0];
      }, [longName]);

  return (
    <div className={styles.avatar} style={style}>
      {name}
    </div>
  );
}
