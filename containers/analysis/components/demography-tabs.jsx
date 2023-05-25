import React, { useState } from "react";
import cx from "classnames";

import {
  DISTRIBUTION_TAB_LIST,
  mappedEaseAccessPoliceStation,
  mappedPoliceStationDistribution,
  mappedPopulationDistribution,
  mappedPresencePoliceStation,
  GENDER_DISTRIBUTION_DATA_CHART,
  RELIGION_DISTRIBUTION_DATA_CHART,
  LANGUAGE_DISTRIBUTION_DATA_CHART,
  ETNIS_DISTRIBUTION_DATA_CHART,
} from "../constant";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import CardContent from "./card";
import { DEMOGRAPHY_DATA } from "../data/demography";
import { getBarChartOption, getDonutChartOption } from "../utils";
import GrowthIcon from "./growth-icon";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MapChoropleth = dynamic(() => import("./map-choropleth"), {
  ssr: false,
});
const MapCluster = dynamic(() => import("./map-cluster"), {
  ssr: false,
});

const PopulationDistribution = () => {
  const [selectedTab, setSelectedTab] = useState("gender");

  const getChartOption = () => {
    switch (selectedTab) {
      case "gender":
        return GENDER_DISTRIBUTION_DATA_CHART;
      case "religion":
        return RELIGION_DISTRIBUTION_DATA_CHART;
      case "language":
        return LANGUAGE_DISTRIBUTION_DATA_CHART;
      case "etnis":
        return ETNIS_DISTRIBUTION_DATA_CHART;

      default:
        GENDER_DISTRIBUTION_DATA_CHART;
        break;
    }
  };

  return (
    <div className="population-bar-chart  w-full px-20 h-[550px] border border-[#E8E8E8] flex items-center flex-col py-14">
      <div className="flex w-full justify-between">
        <div className="w-full text-xl font-medium text-white flex items-center gap-2 mb-5">
          Persebaran Penduduk
          <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
        </div>

        <div className="h-[45px] flex bg-[#4F5FC7] rounded">
          {DISTRIBUTION_TAB_LIST?.map((tab, idx) => (
            <div
              onClick={() => setSelectedTab(tab?.value)}
              className={cx(
                "h-full w-[96px] p-[13px] text-white text-xs flex items-center justify-center font-medium rounded cursor-pointer",
                {
                  "!w-[210px]": idx === 0,
                  "opacity-50": selectedTab === tab?.value,
                },
              )}
              key={tab?.value}
            >
              {tab?.label}
            </div>
          ))}
        </div>
      </div>
      <Chart
        options={getChartOption()?.options}
        series={getChartOption()?.series}
        type="bar"
        width="900"
        height="360"
      />
    </div>
  );
};

const DemographyTab = () => {
  const easeAccessPoliceStationData = getDonutChartOption(mappedEaseAccessPoliceStation);
  const presencePoliceStationData = getDonutChartOption(mappedPresencePoliceStation);
  const populationDistributionData = getBarChartOption(mappedPopulationDistribution);
  const policeStationDistributionData = getBarChartOption(mappedPoliceStationDistribution);

  return (
    <div className="w-full mt-6">
      <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-20">
        Persebaran Penduduk
        <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
      </div>

      <div className="population-data flex">
        <CardContent className="h-[255px] mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Angka Kelahiran</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Birth Rate)</p>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">{DEMOGRAPHY_DATA?.growth_rate?.birth_rate?.total_count}</p>
            <div className="flex items-center">
              <GrowthIcon
                text={`${DEMOGRAPHY_DATA?.growth_rate?.birth_rate?.growth_percentage}%`}
                isGrowth={DEMOGRAPHY_DATA?.growth_rate?.birth_rate?.is_growth}
              />
            </div>
          </div>
        </CardContent>

        <CardContent className="h-[255px] mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Angka kematian</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Death Rate)</p>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">{DEMOGRAPHY_DATA?.growth_rate?.death_rate?.total_count}</p>
            <div className="flex items-center">
              <GrowthIcon
                isGrowth={DEMOGRAPHY_DATA?.growth_rate?.death_rate?.is_growth}
                text={`${DEMOGRAPHY_DATA?.growth_rate?.death_rate?.growth_percentage}%`}
              />
            </div>
          </div>
        </CardContent>

        <CardContent className="h-[255px] mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Angka Pertumbuhan</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Growth Figure)</p>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">
              {DEMOGRAPHY_DATA?.growth_rate?.growth_figure_rate?.total_count}
            </p>
            <div className="flex items-center">
              <GrowthIcon
                isGrowth={DEMOGRAPHY_DATA?.growth_rate?.growth_figure_rate?.is_growth}
                text={`${DEMOGRAPHY_DATA?.growth_rate?.death_rate?.growth_percentage}%`}
              />
            </div>
          </div>

          <p className="text-white font-normal text-base mt-5">
            Perkiraan Pertumbuhan Penduduk{" "}
            {DEMOGRAPHY_DATA?.growth_rate?.growth_figure_rate?.estimation_population_growth} Jiwa/Tahun
          </p>
        </CardContent>
      </div>

      <PopulationDistribution />

      <div className="flex">
        <div className="h-[486px] w-[60%] py-[38px] px-[0] border border-[#E8E8E8] flex flex-col">
          <div className="flex w-full justify-between  mb-10">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-[84px] justify-center">
              Peta Persebaran
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <MapChoropleth />
        </div>
        <div className="w-[40%] h-[486px] py-[34px] px-0 border border-[#E8E8E8] flex flex-col">
          <div className="w-full text-md text-white flex gap-2 px-8 flex-col">
            Legenda <br />
            <span className="!font-semibold">Jumlah Jiwa</span>
          </div>
          <div className="w-full mt-4">
            <div className="w-full flex">
              <div className="flex px-8 items-center gap-2 mt-6">
                <div className="box w-5 h-5 bg-[#FDC694]" />
                <div className="text-white text-sm">4k - 8k</div>
              </div>
              <div className="flex px-8 items-center gap-2 mt-6">
                <div className="box w-5 h-5 bg-[#F78A25]" />
                <div className="text-white text-sm"> {`>`} 10k</div>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex px-8 items-center gap-2 mt-6">
                <div className="box w-5 h-5 bg-[#FFE3CA]" />
                <div className="text-white text-sm"> {`<`} 4k</div>
              </div>
              <div className="flex px-8 items-center gap-2 mt-6 ml-4">
                <div className="box w-5 h-5 bg-[#F8AC66]" />
                <div className="text-white text-sm">8k - 10k</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-[50%] h-[486px] py-[38px]  border border-[#E8E8E8]  flex flex-col">
          <div className="flex w-full justify-between  mb-10">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2  px-8">
              Peta Persebaran Penduduk
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <div className="px-8">
            <MapCluster />
          </div>
        </div>

        <div className="w-[50%] h-[486px] py-[34px] px-[30px] border border-[#E8E8E8]  flex flex-col">
          <div className="flex w-full justify-between  mb-2">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Grafik Persebaran Penduduk
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
              <span className="text-sm font-normal">(dalam jutaan)</span>
            </div>
          </div>
          <div className="w-full">
            <Chart
              options={populationDistributionData?.options}
              series={populationDistributionData?.series}
              type="bar"
              width="100%"
              height="388"
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-5 text-xl font-medium text-white flex items-center gap-2 px-20">
        Keamanan
        <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
      </div>

      <div className="security-data flex">
        <div className="w-full h-[400px] py-[38px] px-8 border border-[#E8E8E8] mt-6 flex flex-col">
          <div className="flex w-full justify-between  mb-10">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Keberadaan Pos Polisi
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <Chart
            height="186"
            options={presencePoliceStationData?.options}
            series={presencePoliceStationData?.series}
            type="donut"
          />
        </div>
        <div className="w-full h-[400px] py-[38px] px-8 border border-[#E8E8E8] mt-6 flex flex-col">
          <div className="flex w-full justify-between  mb-10">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Kemudahan Akses Pos Polisi
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <Chart
            height="186"
            options={easeAccessPoliceStationData?.options}
            series={easeAccessPoliceStationData?.series}
            type="donut"
          />
        </div>
      </div>

      <div className="graphic-data flex">
        <CardContent className="max-w-[50%] w-[50%] h-[486px] py-[38px] !px-[0]">
          <div className="flex w-full justify-between  mb-10 px-8">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Keberadaan Pos Polisi
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>

          <div className="px-8">
            <MapCluster />
          </div>
        </CardContent>
        <CardContent className="max-w-[50%] w-[50%] h-[486px] py-[34px] !px-[0]">
          <div className="flex w-full justify-between  mb-2">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-8">
              Grafik Persebaran Pos Polisi
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
              <span className="text-sm font-normal">(dalam jutaan)</span>
            </div>
          </div>
          <div className="px-8">
            <Chart
              options={policeStationDistributionData?.options}
              series={policeStationDistributionData?.series}
              type="bar"
              width="100%"
              height="388"
            />
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default DemographyTab;
