import HomeNavbar from "@/components/pagecomponents/home/HomeNavbar";
import Menu from "@/components/pagecomponents/home/Menu";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../components/elements/map/Home.module.css";
import geojson from "./geojson";

const Map = dynamic(() => import("../../components/elements/map/Map"), {
  ssr: false,
});

const PatroliPage = ({ profile }) => {
  const [selectedContent, setSelectedContent] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);

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
    <>
      <Head>
        <title>Dashboard · Patrons</title>
      </Head>
      <div className="relative h-screen w-screen">
        <HomeNavbar profile={profile} setSelectedContent={setSelectedContent} selectedContent={selectedContent} />
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
        <Menu />
      </div>
    </>
  );
};

export default PatroliPage;
