import { useMemo } from 'react';
import styles from './nameAvatar.module.css';

export default function NameAvatar({ shortName, longName, style }) {
  const name = shortName
    ? shortName
    : useMemo(() => {
        // TODO: create name summarizer
        return 'AP';
      }, [longName]);

  return (
    <div className={styles.avatar} style={style}>
      {name}
    </div>
  );
}
