import styles from "./home.module.css";

import NameAvatar from "../../elements/nameAvatar/NameAvatar";

export default function BlueCard() {
  return (
    <div className={styles.blue_card}>
      <div className="row">
        <div className="col-6">
          <div className={styles.title_top_left}>Target Koordinator</div>
          <div className={styles.value_top_left}>23%</div>
        </div>
        <div className="col-6">
          <div className={styles.title_top_right}>Koordinator berprestasi:</div>
          <div className={styles.multi_avatar_container}>
            <NameAvatar shortName="AP" style={{ borderColor: "#016CEE" }} />
            <NameAvatar shortName="AP" style={{ borderColor: "#016CEE" }} />
            <NameAvatar shortName="AP" style={{ borderColor: "#016CEE" }} />
            <NameAvatar shortName="AP" style={{ borderColor: "#016CEE" }} />
            <NameAvatar shortName="AP" style={{ borderColor: "#016CEE" }} />
          </div>
        </div>
      </div>
      <div className={styles.hr}></div>
      <div className="row">
        <div className="col-6">
          <div className={styles.title_bottom_left}>Total pemilih:</div>
          <div className={styles.value_bottom_left}>
            <div className={styles.value_bottom_left_1}>6875</div>
            <div className={styles.value_bottom_left_2}>12.8% up</div>
          </div>
        </div>
        <div className="col-6">
          <div className={styles.title_bottom_right}>Grafik pemilih:</div>
          <div>chart</div>
        </div>
      </div>
    </div>
  );
}
