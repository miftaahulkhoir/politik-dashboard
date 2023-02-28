import dynamic from "next/dynamic";
import React from "react";
import ReactWordcloud from "react-d3-cloud";

import styles from "./sentiment.module.css";

import Card from "../../elements/card/Card";

const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function SocialWordChart({ title, data, chartType }) {
  // const timestamp = [];
  // let series = [];
  // const legends = [];
  // const colors = ["#08c4b2", "#6f5ed3", "#ce3665", "#ffcd1c", "#3896e3"];

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
  //         // areaStyle: {
  //         //   opacity: 1,
  //         //   color: colors[0],
  //         // },
  //         color: colors[0],
  //         data: temp,
  //         // emphasis: {
  //         //   focus: 'series',
  //         // },
  //         // encode: {
  //         //   x: "timestamp",
  //         //   y: "Data"
  //         // }
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
  // dimensions[0] = "timestamp";

  // data.forEach((value, index) => {
  //   // assign value
  //   let temp = [];
  //   data.forEach((val, ind) => {
  //     val.entries.forEach((v, i) => {
  //       if (temp.length == 0) {
  //         temp.push(new Date(value.entries[index].key*1000));
  //       }
  //       if (index == i) {
  //         temp.push(v.value);
  //       }
  //     })
  //     // formattedData[i] = [new Date(v.key*1000), v.value];
  //   })

  //   formattedData[index] = temp;

  //   // set dimension of each dataset
  //   dimensions[index+1] = value.key.charAt(0).toUpperCase() + value.key.slice(1);
  //   legends[index] = value.key.charAt(0).toUpperCase() + value.key.slice(1);

  //   // set series
  //   series[index] = {
  //     name: dimensions[index+1],
  //     type: 'line',
  //     smooth: true,
  //     showSymbol: false,
  //     areaStyle: {
  //       opacity: 1,
  //       color: colors[index],
  //     },
  //     color: colors[index],
  //     emphasis: {
  //       focus: 'series',
  //     },
  //     encode: {
  //       x: "timestamp",
  //       y: dimensions[index+1]
  //     }
  //   }
  // })
  // }
  // }

  return (
    <Card>
      <div className={styles.social_chart}>
        <p style={{ fontSize: "16px", color: "black", fontWeight: "700" }}>{title}</p>
        <ReactWordcloud data={data} width={500} height={120} rotate={0} />
      </div>
    </Card>
  );
}
