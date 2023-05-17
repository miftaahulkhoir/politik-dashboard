export function convertDataToBarChartProp(data) {
  return {
    categories: data.map((item) => item.name),
    series: data.map((item) => item.total),
  };
}

export function getDonutChartOption({ labels, series, colorLabels }) {
  return {
    series,
    options: {
      dataLabels: {
        enabled: false,
      },
      labels,
      stroke: {
        show: false,
      },
      legend: {
        show: true,
        markers: {
          width: 19,
          height: 19,
          strokeWidth: 0,
          strokeColor: "#fff",
          offsetX: 0,
          offsetY: 10,
          radius: 0,
        },
        formatter: function (seriesName, opts) {
          return `<span class="text-sm !-mt-5 ml-3">${seriesName} <br/> <span class="ml-9 font-medium text-base">${
            opts.w.globals.series[opts.seriesIndex]
          }%</span></span>`;
        },
        labels: {
          colors: ["#fff"],
          useSeriesColors: false,
        },
        horizontalAlign: "left",
        offsetY: 9,
      },
      colors: colorLabels,
      chart: {
        type: "donut",
      },
    },
  };
}

export function getBarChartOption({ series, categories, withBarLabel = true }) {
  return {
    series: [
      {
        data: series,
      },
    ],
    options: {
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: withBarLabel,
        offsetX: 35,
        style: {
          colors: ["#fff"],
          marginLeft: "20px",
        },
      },
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: ["#ffffff"],
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "white",
          },
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: "white",
          },
        },
        categories,
      },
    },
  };
}

export function getLineChartOption({ series, categories }) {
  return {
    series: [
      {
        name: "",
        data: series,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {},
      },
      yaxis: {
        labels: {
          style: {
            colors: "white",
          },
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: "white",
          },
        },
        categories,
      },
      markers: {
        show: true,
      },
      colors: ["#fff"],
    },
  };
}
