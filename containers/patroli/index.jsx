import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../components/elements/map/Home.module.css";
import geojson from "./geojson";
import LayerData from "@/components/pagecomponents/home/LayerData";
import LayerFilter from "@/components/pagecomponents/home/LayerFilter";
import DashboardLayout from "@/layouts/DashboardLayout";

const Map = dynamic(() => import("../../components/elements/map/Map"), {
  ssr: false,
});

const PatroliPage = ({ profile }) => {
  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);
  const [isShowGeoJSON, setIsShowGeoJSON] = useState(false);

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

  return (
    <DashboardLayout title={"Dashboard · Patrons"} profile={profile}>
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
                  {isShowGeoJSON && (
                    <GeoJSON ref={GeoJSONEL} attribution="&copy; credits due..." data={geojson} style={style} />
                  )}
                </>
              );
            }}
          </Map>
        </div>
      )}
      <LayerFilter setIsShowGeoJSON={setIsShowGeoJSON} />
      {isShowGeoJSON && <LayerData />}
    </DashboardLayout>
  );
};

export default PatroliPage;
