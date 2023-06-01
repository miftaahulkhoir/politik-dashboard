import { CRIME_DATA } from "./data/crime";
import { DEMOGRAPHY_DATA } from "./data/demography";
import { DISASTER_DATA } from "./data/disaster";
import { TERRORISM_DATA } from "./data/terrorism";
import { convertDataToBarChartProp } from "./utils";

export const DISTRIBUTION_TAB_LIST = [
  { label: "Umur dan Jenis Kelamin", value: "gender" },
  { label: "Etnis", value: "etnis" },
  { label: "Bahasa", value: "language" },
  { label: "Agama", value: "religion" },
];

export const TERRORIST_TAB_LIST = [
  { label: "Gerakan Radikal", value: "radikal" },
  { label: "Separatis", value: "separatis" },
];

export const CRIME_MENU = [
  {
    title: "Nyawa",
    subMenu: [
      {
        title: "Pembunuhan",
      },
    ],
  },
  {
    title: "Fisik/Badan",
    subMenu: [
      {
        title: "Penganiayaan Berat",
      },
      {
        title: "Penganiayaan Ringan",
      },
      {
        title: "KDRT",
      },
    ],
  },
  {
    title: "Kesusilaan",
    subMenu: [
      {
        title: "Perkosaan",
      },
      {
        title: "Pencabulan",
      },
    ],
  },
  {
    title: "Kemerdekaan Orang",
    subMenu: [
      {
        title: "Penculikan",
      },
      {
        title: "Mempekerjakan Anak…",
      },
    ],
  },
  {
    title: "Hak Milik/Barang dengan Penggunaan Kekerasan",
    subMenu: [
      {
        title: "Pencurian dengan Kekeraasan",
      },
      {
        title: "Pencurian dengan Kekerasan Senpi",
      },
      {
        title: "Pencurian dengan Kekerasan Sajam",
      },
    ],
  },
  {
    title: "Hak Milik/Barang",
    subMenu: [
      {
        title: "Pencurian",
      },
      {
        title: "Pencurian dengan pemberatan",
      },
      {
        title: "Pencurian Kendaraan bermotor",
      },
      {
        title: "Pengrusakan/Penghancuran Barang",
      },
      {
        title: "Pembakaran dengan Sengaja",
      },
      {
        title: "Penadahan",
      },
    ],
  },
  {
    title: "Terkait Narkotika",
    subMenu: [
      {
        title: "Narkotika dan Psikotropika",
      },
    ],
  },
  {
    title: "Penipuan, Penggelapan, dan Korupsi",
    subMenu: [
      {
        title: "Penipuan/Perbuatan Curang",
      },
      {
        title: "Penggelapan",
      },
      {
        title: "Korupsi",
      },
    ],
  },
  {
    title: "Ketertiban Umum",
    subMenu: [
      {
        title: "Terhadap Ketertiban umum",
      },
    ],
  },
];

export const TERRORIST_MENU = [
  {
    title: "Bentuk Terorisme",
    subMenu: [
      {
        title: "Pengeboman",
      },
      {
        title: "Penusukan",
      },
      {
        title: "Penyandraan",
      },
    ],
  },
  {
    title: "Lembaga Terafiliasi Teroris",
    subMenu: [
      {
        title: "Santren Kanan",
      },
      {
        title: "Al chappo Foundation",
      },
      {
        title: "Cepat Singgap Jawa Timur",
      },
    ],
  },
  {
    title: "Separatis",
    subMenu: [
      {
        title: "GAM (Gerakan Aceh Merdeka)",
      },
      {
        title: "OPM (Organisasi Papua Merdeka)",
      },
    ],
  },
  {
    title: "Gerakan Radikal",
    subMenu: [
      {
        title: "Mujahideen Indonesia Barat",
      },
      {
        title: "Mujahideen Indonesia Timur",
      },
      {
        title: "khwan Muwahid Indunisy Fie",
      },
      {
        title: "Ansharul Kilafah Jawa Timur",
      },
    ],
  },
];

export const DISASTER_MENU = [
  "Tanah Longsor",
  "Banjir dan tanah Longsor",
  "Abrasi",
  "Puting Beliung",
  "Kekeringan",
  "Kebakaran Hutan dan Lahan",
  "Gempa Bumi",
  "Tsunami",
  "Gempa Bumi dan Tsunami",
  "Letusan Gunung Api",
  "Kebakaran",
  "Kecelakaan",
  "Pohon Tumbang",
];

export const PROVINCE = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "DIY",
  "Sumatera Selatan",
  "Aceh",
  "Gorontalo",
  "Banten",
  "Bali",
  "Riau",
];

const BAR_CHART_OPTION = {
  legend: {
    show: true,
    labels: {
      colors: ["#fff"],
      useSeriesColors: false,
    },
    horizontalAlign: "left",
    offsetY: 9,
  },
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 4,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 3,
    colors: ["white"],
  },
  xaxis: {
    categories: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    labels: {
      style: {
        colors: "white",
      },
    },
  },
  yaxis: {
    max: 100,
    labels: {
      style: {
        colors: "white",
      },
      formatter: (value) => {
        return `${value}%`;
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " %";
      },
    },
  },
};

export const GENDER_DISTRIBUTION_DATA_CHART = {
  series: [
    {
      name: "Laki-laki",
      data: [44, 55, 57, 56, 61, 58, 75],
      color: "#3290ED",
    },
    {
      name: "Perempuan",
      data: [44, 55, 57, 56, 61, 58, 75],
      color: "#D854DB",
    },
  ],

  options: BAR_CHART_OPTION,
};

export const RELIGION_DISTRIBUTION_DATA_CHART = {
  series: [
    {
      name: "Islam",
      data: [44, 55, 17, 56, 81, 58, 75],
    },
    {
      name: "Katholik",
      data: [44, 55, 87, 56, 11, 58, 75],
    },
    {
      name: "Protestan",
      data: [44, 55, 67, 56, 41, 58, 75],
    },
    {
      name: "Hindu",
      data: [44, 55, 27, 56, 91, 58, 75],
    },
    {
      name: "Budha",
      data: [44, 55, 37, 56, 62, 58, 75],
    },
  ],

  options: BAR_CHART_OPTION,
};

export const LANGUAGE_DISTRIBUTION_DATA_CHART = {
  series: [
    {
      name: "Jawa",
      data: [64, 55, 57, 46, 61, 58, 75],
    },
    {
      name: "Sunda",
      data: [34, 55, 57, 16, 61, 58, 75],
    },
    {
      name: "Bahasa",
      data: [84, 55, 57, 96, 61, 58, 75],
    },
    {
      name: "Minang",
      data: [94, 55, 57, 76, 61, 58, 75],
    },
    {
      name: "inggris",
      data: [14, 55, 57, 46, 61, 58, 75],
    },
  ],

  options: BAR_CHART_OPTION,
};

export const ETNIS_DISTRIBUTION_DATA_CHART = {
  series: [
    {
      name: "Jawa",
      data: [100, 55, 96, 16, 61, 58, 75],
    },
    {
      name: "Tionghoa",
      data: [44, 35, 57, 26, 61, 58, 75],
    },
    {
      name: "Sunda",
      data: [44, 45, 57, 56, 61, 58, 75],
    },
    {
      name: "Madura",
      data: [44, 55, 100, 56, 61, 58, 75],
    },
    {
      name: "Batak",
      data: [12, 21, 12, 51, 82, 58, 75],
    },
  ],

  options: BAR_CHART_OPTION,
};

export const DISASTER_CRIME_CONNECTION_CHART_DATA = {
  series: [
    {
      name: "Kecelakaan",
      data: generateRandomDataHeatMap(6, {
        min: 0,
        max: 1000,
      }),
    },
    {
      name: "Gempa Bumi",
      data: generateRandomDataHeatMap(6, {
        min: 0,
        max: 1000,
      }),
    },
    {
      name: "Tsunami",
      data: generateRandomDataHeatMap(6, {
        min: 0,
        max: 1000,
      }),
    },
    {
      name: "Kebakaran",
      data: generateRandomDataHeatMap(6, {
        min: 0,
        max: 1000,
      }),
    },
    {
      name: "Kekeringan",
      data: generateRandomDataHeatMap(6, {
        min: 0,
        max: 1000,
      }),
    },
  ],
  options: {
    yaxis: {
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    xaxis: {
      position: "top",
      type: "category",
      categories: ["Pencurian", "Perkosaan", "Pembunuhan", "Penadahan", "Penipuan", "Korupsi"],
      labels: {
        style: {
          colors: "white",
        },
      },
    },
    chart: {
      height: 350,
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#F7282C"],
  },
};

function generateRandomDataHeatMap(count, yrange) {
  return Array.from({ length: count }, (_, i) => {
    const x = (i + 1).toString();
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    return { x, y };
  });
}

// demography
export const mappedEaseAccessPoliceStation = {
  labels: ["Mudah", "Sangat Mudah", "Sangat Sulit", "Sulit"],
  series: [
    DEMOGRAPHY_DATA?.ease_access_police_station_percentage?.easy,
    DEMOGRAPHY_DATA?.ease_access_police_station_percentage?.very_easy,
    DEMOGRAPHY_DATA?.ease_access_police_station_percentage?.very_hard,
    DEMOGRAPHY_DATA?.ease_access_police_station_percentage?.hard,
  ],
  colorLabels: ["#F7292D", "#7729F7", "#F7B129", "#F75A29"],
};

export const mappedPresencePoliceStation = {
  labels: ["Ada Pos Polisi", "Tidak Ada Pos Polisi"],
  series: [
    DEMOGRAPHY_DATA?.police_station_presence_percentage?.exist,
    DEMOGRAPHY_DATA?.police_station_presence_percentage?.not_exist,
  ],
  colorLabels: ["#F7292D", "#9A9A9A"],
};

export const mappedPopulationDistribution = convertDataToBarChartProp(DEMOGRAPHY_DATA.population_distribution);

export const mappedPoliceStationDistribution = convertDataToBarChartProp(DEMOGRAPHY_DATA.police_station_distribution);

// crime
export const mappedMostCrimePlace = convertDataToBarChartProp(CRIME_DATA?.most_crime_place);

export const mappedMostCrimeAction = convertDataToBarChartProp(CRIME_DATA?.most_crime_action);

export const mappedCrimeGrowth = convertDataToBarChartProp(CRIME_DATA?.crime_growth);

// disaster
export const mappedMostDisasterPlace = convertDataToBarChartProp(DISASTER_DATA?.most_disaster_place);

export const mappedMostDisasterAction = convertDataToBarChartProp(DISASTER_DATA?.most_disaster_action);

export const mappedDisasterGrowth = convertDataToBarChartProp(DISASTER_DATA?.disaster_growth);

// terrorism
export const mappedMostTerrorismPlace = convertDataToBarChartProp(TERRORISM_DATA?.most_terrorism_place);

export const mappedMostTerrorismFollower = convertDataToBarChartProp(TERRORISM_DATA?.most_terrorism_follower);

export const mappedMostTerrorismSeperateFollower = convertDataToBarChartProp(
  TERRORISM_DATA?.most_terrorism_separatis_follower,
);

export const mappedTerrorismGrowth = convertDataToBarChartProp(TERRORISM_DATA?.terrorism_growth);
