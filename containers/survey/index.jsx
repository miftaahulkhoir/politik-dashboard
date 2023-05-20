import dynamic from "next/dynamic";
import styles from "../../components/elements/map/Home.module.css";

import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useRef, useState } from "react";
import geojson from "./geojson";
import { useRouter } from "next/router";

const Map = dynamic(() => import("../../components/elements/map/Map"), {
  ssr: false,
});

const SurveyContainer = (props) => {
  const router = useRouter();

  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const GeoJSONEL = useRef(null);

  const style = {
    weight: 2,
    opacity: 1,
    color: "white",
    fillOpacity: 0.2,
    fillColor: "#F78A25",
  };

  if (typeof document !== "undefined") {
    document.cookie =
      "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZXZlbCI6IjEiLCJleHAiOjE2ODUxNzExNzYsImlzcyI6Ijl5d3lhaXprYmMifQ.n9UVpfo-BC191A0lvKk28DAvp5O-LUEsxeqqcvcf4Do";
  }
  return (
    <DashboardLayout
      title="Survey · Patrons"
      topBarConfig={{
        isShowSearchRegion: false,
        title: "Survey",
        onClickAnalysis: () => router.push("/survey/analysis"),
      }}
    >
      {isMounted && (
        <div className="map">
          <Map className={styles.homeMap} center={cordinate} cordinate={cordinate} zoom={5.4}>
            {({ TileLayer, GeoJSON }) => {
              return (
                <>
                  <TileLayer
                    className="map"
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
                  />
                  <GeoJSON ref={GeoJSONEL} attribution="&copy; credits due..." data={geojson} style={style} />
                </>
              );
            }}
          </Map>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SurveyContainer;
