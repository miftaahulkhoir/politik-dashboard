import styles from "./home.module.css";

import NameAvatar from "../../elements/nameAvatar/NameAvatar";

export default function BlueCard({ coordinatorTarget, starCoordinatorShortNameList, numberOfVoters }) {
  return (
    <div className={styles.blue_card}>
      <div className="row">
        {coordinatorTarget && (
          <div className="col-6">
            <div className={styles.title_top_left}>Target Koordinator</div>
            <div className={styles.value_top_left}>{coordinatorTarget}</div>
          </div>
        )}
        <div className="col-6">
          <div className={styles.title_top_right}>Koordinator berprestasi:</div>
          <div className={styles.multi_avatar_container}>
            {starCoordinatorShortNameList.length > 0 &&
              starCoordinatorShortNameList.map((v) => (
                <NameAvatar key={v} shortName={v} style={{ borderColor: "#016CEE" }} />
              ))}
          </div>
        </div>
      </div>
      <div className={styles.hr}></div>
      <div className="row">
        <div className="col-6">
          <div className={styles.title_bottom_left}>Total pemilih:</div>
          <div className={styles.value_bottom_left}>
            <div className={styles.value_bottom_left_1}>{numberOfVoters}</div>
            {/* NOT READY */}
            {/* <div className={styles.value_bottom_left_2}>12.8% up</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
