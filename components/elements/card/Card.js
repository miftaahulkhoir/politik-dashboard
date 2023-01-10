import styles from './card.module.css';

export default function Card({ children, noPadding = false }) {
  return (
    <div className={styles.card} style={{ padding: noPadding && '0px' }}>
      {children}
    </div>
  );
}
