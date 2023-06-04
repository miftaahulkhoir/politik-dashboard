import React from "react";
import cx from "classnames";

import {
  DISASTER_CRIME_CONNECTION_CHART_DATA,
  mappedCrimeGrowth,
  mappedDisasterGrowth,
  mappedMostCrimeAction,
  mappedMostCrimePlace,
  mappedMostDisasterAction,
  mappedMostDisasterPlace,
  mappedMostTerrorismFollower,
  mappedMostTerrorismPlace,
  mappedMostTerrorismSeperateFollower,
  mappedTerrorismGrowth,
  TERRORIST_TAB_LIST,
} from "../constant";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CardContent from "./card";
import { CRIME_DATA } from "../data/crime";
import GrowthIcon from "./growth-icon";
import { getBarChartOption, getLineChartOption } from "../utils";
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MapCluster = dynamic(() => import("./map-cluster"), {
  ssr: false,
});

const CrimeContent = () => {
  const mostCrimePlace = getBarChartOption(mappedMostCrimePlace);
  const growthCrime = getLineChartOption(mappedCrimeGrowth);
  const mostCrimeAction = getBarChartOption({ ...mappedMostCrimeAction, withBarLabel: false });
  return (
    <>
      <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-20">
        Semua Kejahatan
        <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
      </div>

      <div className="flex">
        <CardContent className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Jumlah Kejahatan</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Crime Total)</p>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">{CRIME_DATA?.growth_rate?.crime_rate?.total_count}</p>
            <div className="flex items-center">
              <GrowthIcon
                isGrowth={CRIME_DATA?.growth_rate?.crime_rate?.is_growth}
                text={`${CRIME_DATA?.growth_rate?.crime_rate?.growth_percentage}%`}
              />
            </div>
          </div>

          <div className="text-[#7B7B7B] text-sm font-medium mt-4">
            Kejahatan terbanyak adalah{" "}
            <span className="text-white">{CRIME_DATA?.growth_rate?.crime_rate?.highlight}</span>
          </div>
        </CardContent>

        <CardContent className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Jumlah Kejahatan Diselesaikan</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Crime Cleared)</p>
          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">
              {CRIME_DATA?.growth_rate?.crime_cleared_rate?.total_count}
            </p>
            <div className="flex items-center">
              <GrowthIcon
                isGrowth={CRIME_DATA?.growth_rate?.crime_cleared_rate?.is_growth}
                text={`${CRIME_DATA?.growth_rate?.crime_cleared_rate?.growth_percentage}%`}
              />
            </div>
          </div>
          <div className="text-[#7B7B7B] text-sm font-medium mt-4">
            Kejahatan yang paling banyak diselesaikan adalah{" "}
            <span className="text-white">{CRIME_DATA?.growth_rate?.crime_rate?.highlight}</span>
          </div>
        </CardContent>

        <CardContent className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Presentase Penyelesaian Kejahatan</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Clearance Rate)</p>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">{CRIME_DATA?.growth_rate?.clearence_rate?.total_count}</p>
            <div className="flex items-center">
              <GrowthIcon
                isGrowth={CRIME_DATA?.growth_rate?.clearence_rate?.is_growth}
                text={`${CRIME_DATA?.growth_rate?.clearence_rate?.growth_percentage}%`}
              />
            </div>
          </div>

          <div className="text-[#7B7B7B] text-sm font-medium mt-4">
            naik 12% dimana sebelumnya{" "}
            <span className="text-white">{CRIME_DATA?.growth_rate?.clearence_rate?.highlight}</span>
          </div>
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="h-[255px]">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Selang Waktu Terjadinya Kejahatan</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Crime Clock)</p>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">{CRIME_DATA?.growth_rate?.crime_clock?.growth_percentage}</p>
            <div className="flex items-center">
              <GrowthIcon
                isGrowth={CRIME_DATA?.growth_rate?.crime_clock?.is_growth}
                text={`${CRIME_DATA?.growth_rate?.crime_clock?.growth_percentage}`}
              />
            </div>
          </div>
        </CardContent>

        <CardContent className="w-full h-[255px]">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Risiko Penduduk Terkena Kejahatan</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>
          <p className="text-white text-base  font-medium">(Crime Rate)</p>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">
              {CRIME_DATA?.growth_rate?.crime_chance_rate?.growth_percentage}
            </p>
            <div className="flex items-center">
              <GrowthIcon
                isGrowth={CRIME_DATA?.growth_rate?.crime_chance_rate?.is_growth}
                text={`${CRIME_DATA?.growth_rate?.crime_chance_rate?.growth_percentage}%`}
              />
            </div>
          </div>
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="max-w-[50%] w-[50%] h-[486px] !px-0">
          <div className="flex w-full justify-between  mb-10 px-12">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Peta Persebaran Kejahatan
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <div className="px-12">
            <MapCluster />
          </div>
        </CardContent>

        <CardContent className="w-[50%] max-w-[50%] h-[486px] py-[34px] !px-0">
          <div className="flex w-full justify-between  mb-2">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-[30px]">
              Daerah Paling Banyak Kejahatan
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
              <span className="text-sm font-normal">(dalam jutaan)</span>
            </div>
          </div>
          <Chart
            options={mostCrimePlace?.options}
            series={mostCrimePlace?.series}
            type="bar"
            width="100%"
            height="388"
          />
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="h-[486px]">
          <div className="flex w-full justify-between ">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Kejahatan yang Sering Terjadi
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <Chart
            options={mostCrimeAction?.options}
            series={mostCrimeAction?.series}
            type="bar"
            width="100%"
            height="388"
          />
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="h-[486px]">
          <div className="flex w-full justify-between ">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Pertumbuhan Terjadinya Kejahatan
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <Chart options={growthCrime?.options} series={growthCrime?.series} type="line" height="388" />
        </CardContent>
      </div>
    </>
  );
};

const DisasterContent = () => {
  const mostDisasterPlace = getBarChartOption(mappedMostDisasterPlace);
  const growthDisaster = getLineChartOption(mappedDisasterGrowth);
  const mostDisasterAction = getBarChartOption({ ...mappedMostDisasterAction, withBarLabel: false });
  return (
    <>
      <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-20">
        Semua Bencana
        <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
      </div>

      <div className="flex">
        <CardContent className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Jumlah Bencana</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">4.000</p>
            <div className="flex items-center">
              <MdOutlineArrowUpward className="w-6 h-6 !text-[#04C600]" />
              <p className="text-sm !text-[#04C600]">12%</p>
            </div>
          </div>

          <div className="text-[#7B7B7B] text-sm font-medium mt-4">
            Bencana terbanyak adalah <span className="text-white">Gunung Api</span>
          </div>
        </CardContent>

        <CardContent className="h-[255px] px-[54px] mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Selang Waktu Terjadinya Bencana</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">0 02’11’</p>
            <div className="flex items-center">
              <MdOutlineArrowDownward className="w-6 h-6 !text-[#4F5FC7]" />
              <p className="text-sm !text-[#4F5FC7]">12%</p>
            </div>
          </div>
        </CardContent>

        <CardContent className="h-[255px] px-[54px] mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Risiko Penduduk Terkena Bencana</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">10,000</p>
            <div className="flex items-center">
              <MdOutlineArrowUpward className="w-6 h-6 !text-[#4F5FC7]" />
              <p className="text-sm !text-[#4F5FC7]">2%</p>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="w-[50%] max-w-[50%] h-[486px] mt-0 !px-0">
          <div className="flex w-full justify-between  mb-10 px-12">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Peta Persebaran Bencana
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <div className="px-12">
            <MapCluster />
          </div>
        </CardContent>

        <CardContent className="w-[50%] max-w-[50%] h-[486px] py-[34px] !px-0 mt-0">
          <div className="flex w-full justify-between  mb-2">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-[36px]">
              Daerah Paling Sering Bencana
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
              <span className="text-sm font-normal">(dalam jutaan)</span>
            </div>
          </div>
          <div className="px-[36px]">
            <Chart
              options={mostDisasterPlace?.options}
              series={mostDisasterPlace?.series}
              type="bar"
              width="100%"
              height="388"
            />
          </div>
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="h-[486px] w-full mt-0">
          <div className="flex w-full justify-between ">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Keterkaitan Bencana dengan Kejahatan
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <div className="flex w-full h-full">
            <Chart
              options={DISASTER_CRIME_CONNECTION_CHART_DATA?.options}
              series={DISASTER_CRIME_CONNECTION_CHART_DATA?.series}
              type="heatmap"
              width="956"
              height="388"
            />
            <div className="flex flex-col gap-2 mt-5">
              <div className="text-white text-sm">Kepadatan</div>
              <div className="flex h-full gap-2">
                <div
                  className="h-[80%] w-3 rounded-md"
                  style={{
                    backgroundImage: "linear-gradient(180deg, rgba(247, 37, 41, 0.5) 0%, #F72529 100%)",
                  }}
                />
                <div className="h-[80%] flex flex-col justify-between">
                  <div className="text-[#706E6B] text-sm">100</div>
                  <div className="text-[#706E6B] text-sm">1000k</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="h-[486px] w-full mt-0">
          <div className="flex w-full justify-between ">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Bencana yang Sering Terjadi
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <Chart
            options={mostDisasterAction?.options}
            series={mostDisasterAction?.series}
            type="bar"
            width="956"
            height="388"
          />
        </CardContent>
      </div>

      <div className="flex">
        <CardContent className="h-[486px] w-full mt-0">
          <div className="flex w-full justify-between ">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Pertumbuhan Terjadinya Bencana
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <Chart options={growthDisaster?.options} series={growthDisaster?.series} type="line" height="388" />
        </CardContent>
      </div>
    </>
  );
};

const TerrorismContent = () => {
  const [selectedTab, setSelectedTab] = useState("radikal");

  const mostTerrorismPlace = getBarChartOption(mappedMostTerrorismPlace);
  const growthTerrorism = getLineChartOption(mappedTerrorismGrowth);

  const mostTerrorismFollowerRadikal = getBarChartOption({ ...mappedMostTerrorismFollower, withBarLabel: false });

  const mostTerrorismFollowerSeparate = getBarChartOption({
    ...mappedMostTerrorismSeperateFollower,
    withBarLabel: false,
  });

  const terrorismFollowerData =
    selectedTab === "radikal" ? mostTerrorismFollowerRadikal : mostTerrorismFollowerSeparate;

  return (
    <>
      <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-20">
        Semua Terrorisme
        <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
      </div>

      <div className="flex">
        <CardContent className="mt-6 ">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Jumlah Terrorisme</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">4.000</p>
            <div className="flex items-center">
              <MdOutlineArrowUpward className="w-6 h-6 !text-[#04C600]" />
              <p className="text-sm !text-[#04C600]">12%</p>
            </div>
          </div>

          <div className="text-white text-sm font-medium mt-4">Terrorisme terbanyak adalah Pengeboman</div>
        </CardContent>

        <CardContent className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Pelaku Terrorisme</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">1200</p>
            <div className="flex items-center">
              <MdOutlineArrowDownward className="w-6 h-6 !text-[#04C600]" />
              <p className="text-sm !text-[#04C600]">12%</p>
            </div>
          </div>
          <div className="text-white text-sm font-medium mt-4">
            Pelaku terrorisme paling banyak dari jaringan El Chappo
          </div>
        </CardContent>

        <CardContent className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Serangan Aksi</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">10,000</p>
            <div className="flex items-center">
              <MdOutlineArrowUpward className="w-6 h-6 !text-[#4F5FC7]" />
              <p className="text-sm !text-[#4F5FC7]">2%</p>
            </div>
          </div>

          <div className="text-white text-sm font-medium mt-4">naik 10% dimana sebelumnya 1080</div>
        </CardContent>
      </div>

      <div className="flex">
        <div className="w-full h-[255px] py-[38px] px-[84px] border border-[#E8E8E8]  flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Jumlah Jaringan Terrorisme</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">125</p>
            <div className="flex items-center">
              <MdOutlineArrowDownward className="w-6 h-6 !text-[#4F5FC7]" />
              <p className="text-sm !text-[#4F5FC7]">Lebih cepat 1 detik</p>
            </div>
          </div>
        </div>

        <div className="w-full h-[255px] py-[38px] px-[84px] border border-[#E8E8E8]  flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-white text-base ">Risiko Penduduk Terkena Terrorisme</p>
            <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
          </div>

          <div className="mt-9 flex items-center gap-1">
            <p className="text-white text-xl  font-medium">90%</p>
            <div className="flex items-center">
              <MdOutlineArrowDownward className="w-6 h-6 !text-[#4F5FC7]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-[50%] h-[486px] py-[38px] px-8  border border-[#E8E8E8]  flex flex-col">
          <div className="flex w-full justify-between  mb-10">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Peta Persebaran Basis Terrorisme
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <MapCluster />
        </div>

        <div className="w-[50%] h-[486px] py-[34px] px-[0px] border border-[#E8E8E8]  flex flex-col">
          <div className="flex w-full justify-between  mb-2">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2 px-[36px]">
              Daerah Paling Terjadi Terrorisme
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <div className="px-[36px]">
            <Chart
              options={mostTerrorismPlace?.options}
              series={mostTerrorismPlace?.series}
              type="bar"
              width="100%"
              height="388"
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="h-[486px] w-full py-[38px] px-[84px] border border-[#E8E8E8] flex flex-col">
          <div className="flex w-full justify-between ">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Kelompok dengan Pengikut Terbanyak
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
            <div className="h-[45px] flex bg-[#4F5FC7] rounded">
              {TERRORIST_TAB_LIST?.map((tab, idx) => (
                <div
                  onClick={() => setSelectedTab(tab?.value)}
                  className={cx(
                    "h-full w-[186px] p-[13px] text-white text-xs flex items-center justify-center font-medium rounded cursor-pointer",
                    {
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
            options={terrorismFollowerData?.options}
            series={terrorismFollowerData?.series}
            type="bar"
            width="956"
            height="388"
          />
        </div>
      </div>

      <div className="flex">
        <div className="h-[486px] w-full py-[38px] px-[84px] border border-[#E8E8E8] flex flex-col">
          <div className="flex w-full justify-between ">
            <div className="w-full text-xl font-medium text-white flex items-center gap-2">
              Graafik Terjadinya Terrorisme
              <AiOutlineQuestionCircle className="!text-[#9A9A9A]" />
            </div>
          </div>
          <Chart options={growthTerrorism?.options} series={growthTerrorism?.series} type="line" height="388" />
        </div>
      </div>
    </>
  );
};

const AnalysisTab = () => {
  const router = useRouter();

  const idFromUrl = router?.query?.id;

  const renderContent = () => {
    switch (idFromUrl) {
      case "crime":
        return <CrimeContent />;
      case "disaster":
        return <DisasterContent />;
      case "terrorism":
        return <TerrorismContent />;
      default:
        return <CrimeContent />;
    }
  };

  return <div className="w-full mt-6">{renderContent()}</div>;
};

export default AnalysisTab;
