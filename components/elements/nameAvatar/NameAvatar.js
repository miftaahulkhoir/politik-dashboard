import { useMemo } from "react";
import { nameToShortName } from "../../../utils/helpers/nameToShortName";

import styles from "./nameAvatar.module.css";

export default function NameAvatar({ shortName, longName, style }) {
  const name = useMemo(() => {
    if (shortName) return shortName;
    return nameToShortName(longName);
  }, [longName, shortName]);

  return (
    <div className={styles.avatar} style={style}>
      {name}
    </div>
  );
}
