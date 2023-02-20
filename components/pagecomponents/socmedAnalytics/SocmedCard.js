import styles from "./socmed.module.css";

import NameAvatar from "../../elements/nameAvatar/NameAvatar";

export default function SocmedCard({ title, data }) {
  return (
    <div className={styles.socmed_summary_card}>
      <div className="row">
        <div className="col-12">
          <div className={styles.title_top_left}>{title}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className={styles.value}>{data}</div>
        </div>
      </div>
    </div>
  );
}
