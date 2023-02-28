import dynamic from "next/dynamic";

const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function SocmedHistorical({ data, title, color, chartType }) {
  const timestamp = [];
  let series = [];
  const dataRaw = [];
  const legends = [];
  let boundaryGap;

  if (chartType === "bar") {
    boundaryGap = true;
  } else {
    boundaryGap = false;
  }

  if (data.length > 0) {
    data.forEach((value, index) => {
      timestamp[index] = value.created_at.split("T")[0];
      dataRaw[index] = getSpecificData(title, value);
    });
    series = [
      {
        name: title,
        type: chartType,
        smooth: true,
        showSymbol: false,
        color: color,
        data: dataRaw,
      },
    ];
    // console.log(series);
  }

  // if (data.length > 0) {
  //   if (chartType == "common") {
  //     const temp = [];
  //     data.forEach((value, index) => {
  //       temp[index] = value.value;
  //       const tempDate = new Date(value.key * 1000);
  //       let tempMonth = tempDate.getUTCMonth() + 1;
  //       tempMonth = tempMonth.toString();
  //       timestamp[index] = `${tempDate.getDate()}-${tempMonth.padStart(2, "0")}-${tempDate.getUTCFullYear()}`;
  //     });
  //     series = [
  //       {
  //         name: "Data",
  //         type: "line",
  //         smooth: true,
  //         showSymbol: false,
  //         color: colors[0],
  //         data: temp,
  //       },
  //     ];
  //   } else if (chartType == "detail") {
  //     data.forEach((value, index) => {
  //       if (value.key != "undefined") {
  //         const temp = [];
  //         value.entries.forEach((v, i) => {
  //           temp[i] = v.value;
  //           const tempDate = new Date(v.key * 1000);
  //           let tempMonth = tempDate.getUTCMonth() + 1;
  //           tempMonth = tempMonth.toString();
  //           timestamp[i] = `${tempDate.getDate()}-${tempMonth.padStart(2, "0")}-${tempDate.getUTCFullYear()}`;
  //         });
  //         legends[index] = value.key.charAt(0).toUpperCase() + value.key.slice(1);
  //         series[index] = {
  //           name: legends[index],
  //           type: "line",
  //           smooth: true,
  //           showSymbol: false,
  //           color: colors[index],
  //           data: temp,
  //         };
  //       }
  //     });
  //   }
  // }

  const option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      center: "center",
      top: "bottom",
      icon: "rect",
      height: 100,
      data: legends,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    dataLabels: {
      enabled: false,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: boundaryGap,
        // data: ['Jan', 'Feb', 'Mar', 'Apr'],
        data: timestamp,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: series,
  };
  return <ReactEcharts option={option} />;
}

function getSpecificData(title, temp) {
  let res;
  // console.log("getspec", temp);
  switch (title) {
    case "Likes":
      res = temp.historical.likes;
      break;
    case "Followers":
      res = temp.historical.followers;
      break;
    case "Following":
      res = temp.historical.following;
      break;
    case "Engagement":
      res = temp.historical.engagement;
      break;
    case "Impressions":
      res = temp.historical.impressions;
      break;
    case "Paid Impressions":
      res = temp.historical.impressions_paid;
      break;
    case "Video View Time":
      res = temp.historical.video_view_time;
      break;
    case "Video Views":
      res = temp.historical.video_views;
      break;
    case "Paid Video Views":
      res = temp.historical.video_views_paid;
      break;
    case "Reactions":
      res = temp.historical.reactions;
      break;
    case "User Likes":
      res = temp.historical.user_likes;
      break;
    case "User Tweet Count":
      res = temp.historical.user_tweet_count;
      break;
    case "Comments":
      res = temp.historical.comments;
      break;
    case "Posted Count":
      res = temp.historical.post_count;
      break;
    case "Profile Views":
      res = temp.historical.profile_views;
      break;
    case "Reach":
      res = temp.historical.reach;
      break;
  }
  return res;
}
