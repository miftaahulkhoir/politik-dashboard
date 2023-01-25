import styles from "../home/home.module.css";

import NameAvatar from "../../elements/nameAvatar/NameAvatar";

export default function AdsSummaryCard({
  title,
  subtitle,
  mentionSum,
  totalImpression,
  engagementRate,
  postLinkClicks,
}) {
  return (
    <div className={styles.social_summary_card}>
      <div className="row">
        <div className="col-5">
          <div className={styles.title_top_left}>{title}</div>
          <div className={styles.subtitle_top_left}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.hr}></div>
      <div className="row">
        <div className="col-4">
          <div className={styles.label}>Number of Mentions</div>
          <div className={styles.value}>{mentionSum}</div>
        </div>
        <div className="col-4">
          <div className={styles.label}>Total Impressions</div>
          <div className={styles.value}>{totalImpression}</div>
        </div>
      </div>
      <div className={styles.hr}></div>
    </div>
  );
}

{
  /* <div className={styles.social_summary_card}>
      <div className='row'>
        <div className='col-5'>
          <div className={styles.title_top_left}>{title}</div>
          <div className={styles.subtitle_top_left}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.hr}></div>
      <div className="row">
        <div className="col-4">
          <div className={styles.label}>Number of Mentions</div>
          <div className={styles.value}>{mentionSum}</div>
        </div>
        <div className="col-4">
          <div className={styles.label}>Total Impressions</div>
          <div className={styles.value}>{totalImpression}</div>
        </div>
        <div className="col-4">
          <div className={styles.label}>Post Link Clicks</div>
          <div className={styles.value}>{postLinkClicks}</div>
        </div>
      </div>
      <div className={styles.hr}></div>
      <div className="row">
        <div className="col-6">
          <div className={styles.label}>Engagement Rate (per Impression)</div>
          <div className={styles.value}>{engagementRate}%</div>
        </div>
      </div>
    </div> */
}
