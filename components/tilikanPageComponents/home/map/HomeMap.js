import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import moment from "moment";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from "react-leaflet";

import HomeGeoJSON from "./HomeGeoJSON";

import capitalizeWords from "../../../../utils/helpers/capitalizeWords";
import trimString from "../../../../utils/helpers/trimString";
import styles from "../../../elements/map/Home.module.css";
import HomeOccupationMarker from "./HomeOccupationMarker";

export default function HomeMap({
  showKoordinator,
  dataKoordinator,
  showRelawan,
  dataRelawan,
  showPemilih,
  dataPemilih,
  showBlackList,
  dataBlackList,
  center,
  setCenter,
  tempCenter,
  setTempCenter,
  userLogCordinate,
  setUserLogCordinate,
  logCordinate,
  setLogCordinate,
  recenter,
  setRecenter,
  handleColor,
  reports,
  setSelectedReport,
  logistics,
  setSelectedLogistic,
  setIsLogisticDetailDrawerOpen,
  setSelectedUser,
  setIsReportDetailDrawerOpen,
  indexShownReportCategories,
  baseURL,
  thematicSurveyResponses,
  setIsRegionQuestionDetailDrawerOpen,
  setSelectedRegion,
  selectedRegionLevel,
  selectedThematicFromLegend,
  originalDataState,
  dataState,
  resetState,
  detailedState,
  regencyState,
  districtState,
}) {
  const [zoom, setZoom] = useState(8);
  const [iconSize, setIconSize] = useState(30);
  const [logType, setLogType] = useState("");
  const [map, setMap] = useState(null);

  const handleDetailCordinate = (userid, name, type) => {
    setLogType(type);
    axios
      .get(
        `${baseURL}api/data-mapping?userid=${userid}&from=${moment
          .utc()
          .local()
          .format("Y-MM-DD")} 00:00:00&until=${moment.utc().local().format("Y-MM-DD")} 23:59:00`,
      )
      .then((res) => {
        const arr = [];
        res.data.data.forEach((element, index) => {
          axios
            .get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${element?.latitude}&lon=${element?.longitude}&apiKey=5523a1bf84d64e849bdd9a6ca7af26e2`,
            )
            .then((res2) => {
              arr[index] = {
                name: name,
                locationName: `${res2.data.features[0]?.properties?.address_line1}, ${res2.data.features[0]?.properties?.address_line2}`,
                ...element,
              };
              if (index === res.data.data.length - 1) {
                setLogCordinate(arr);
              }
            })
            .catch((err) => {});
        });
        map.flyTo([res.data.data[0]?.latitude, res.data.data[0]?.longitude]);
      })
      .catch((err) => {});
  };

  const getReportIconURLByID = (id) => {
    if (id == 1) return "/images/map/markers/report-1.svg";
    return "/images/map/markers/report-2.svg";
  };
  const getIconURLByID = (id) => {
    const numID = Number(id) || 0;
    if (numID > 0 && numID <= 10) {
      return `/images/map/markers/icon-${id}.svg`;
    }
    return "/images/map/markers/icon-1.svg";
  };

  return (
    <MapContainer center={center} zoom={zoom} zoomControl={false} ref={setMap} className={styles.homeMap}>
      {/* <HomeMapComponent
        setZoom={setZoom}
        recenter={recenter}
        tempCenter={tempCenter}
        setCenter={setCenter}
        setRecenter={setRecenter}
        setIconSize={setIconSize}
      /> */}
      <TileLayer
        className="map"
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
      />
      {showKoordinator === true && (
        <>
          {/* <MarkerClusterGroup> */}
          {dataKoordinator.map((m, index) => (
            // <HomeOccupationMarker
            //   key={index}
            //   setSelectedUser={setSelectedUser}
            //   handleDetailCordinate={handleDetailCordinate}
            //   setTempCenter={setTempCenter}
            //   setUserLogCordinate={setUserLogCordinate}
            //   m={m}
            //   iconSize={iconSize}
            // />
            <Marker
              key={index}
              eventHandlers={{
                click: (e) => {
                  setSelectedUser(m);
                  handleDetailCordinate(m.id, m.name, "koordinator");
                  setTempCenter([m.latitude, m.longitude]);
                  setUserLogCordinate(true);
                },
              }}
              icon={
                new L.Icon({
                  iconUrl: "/images/map/markers/user-koordinator.svg",
                  iconSize: [iconSize, iconSize],
                  iconAnchor: [iconSize / 2, iconSize / 2],
                })
              }
              position={[m?.latitude, m?.longitude]}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                {trimString(m?.name, 30) || "-"}
              </Tooltip>
            </Marker>
          ))}
          {/* </MarkerClusterGroup> */}
        </>
      )}

      {showRelawan === true && (
        <>
          {dataRelawan.map(
            (m, index) =>
              m.longitude !== "" && (
                <Marker
                  key={index}
                  eventHandlers={{
                    click: (e) => {
                      setSelectedUser(m);
                      handleDetailCordinate(m.id, m.name, "relawan");
                      setTempCenter([m.latitude, m.longitude]);
                      setUserLogCordinate(true);
                    },
                  }}
                  icon={
                    new L.Icon({
                      iconUrl: "/images/map/markers/user-relawan.svg",
                      iconSize: [iconSize, iconSize],
                      iconAnchor: [iconSize / 2, iconSize / 2],
                    })
                  }
                  position={[m?.latitude, m?.longitude]}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                    {trimString(m?.name, 30) || "-"}
                  </Tooltip>
                </Marker>
              ),
          )}
        </>
      )}

      {showPemilih === true && (
        <>
          {dataPemilih.map(
            (m, index) =>
              m.longitude !== "" && (
                <Marker
                  key={index}
                  icon={
                    new L.Icon({
                      iconUrl: "/images/map/markers/user-pemilih.svg",
                      iconSize: [iconSize, iconSize],
                      iconAnchor: [iconSize / 2, iconSize / 2],
                    })
                  }
                  position={[m?.latitude, m?.longitude]}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                    {trimString(m?.name, 30) || "-"}
                  </Tooltip>
                </Marker>
              ),
          )}
        </>
      )}

      {showBlackList === true && (
        <>
          {dataBlackList.map(
            (m, index) =>
              m.longitude !== "" && (
                <Marker
                  key={index}
                  icon={
                    new L.Icon({
                      iconUrl: "/images/map/markers/user-blacklist.svg",
                      iconSize: [iconSize, iconSize],
                      iconAnchor: [iconSize / 2, iconSize / 2],
                    })
                  }
                  position={[m?.latitude, m?.longitude]}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                    {trimString(m?.name, 30) || "-"}
                  </Tooltip>
                </Marker>
              ),
          )}
        </>
      )}

      {/* {userLogCordinate === true && (
        <MarkerClusterGroup>
          {logCordinate.map((m, index) => (
            <Marker
              key={index}
              icon={
                new L.Icon({
                  iconUrl: `/images/map/markers/user-${logType}.svg`,
                  iconSize: [iconSize, iconSize],
                  iconAnchor: [iconSize / 2, iconSize / 2],
                })
              }
              position={[m?.latitude, m?.longitude]}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                {trimString(m?.name, 30) || "-"}
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      )} */}

      {/* REPORTS */}
      {/* {reports.map(
        (report, index) =>
          report?.latitude &&
          report?.longitude && (
            <Marker
              key={index}
              icon={
                new L.Icon({
                  iconUrl: getReportIconURLByID(report.category.id),
                  iconSize: [iconSize, iconSize],
                  iconAnchor: [iconSize / 2, iconSize / 2],
                })
              }
              position={[report?.latitude, report?.longitude]}
              eventHandlers={{
                click: (e) => {
                  setSelectedReport(report);
                  setIsReportDetailDrawerOpen(true);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                {trimString(capitalizeWords(report?.title), 30)}
              </Tooltip>
            </Marker>
          ),
      )} */}

      {/* Logistic */}
      {/* {logistics.map(
        (logistic, index) =>
          logistic?.latitude &&
          logistic?.longitude && (
            <Marker
              key={index}
              icon={
                new L.Icon({
                  iconUrl: getIconURLByID(logistic.category.id),
                  iconSize: [iconSize, iconSize],
                  iconAnchor: [iconSize / 2, iconSize / 2],
                })
              }
              position={[logistic?.latitude, logistic?.longitude]}
              eventHandlers={{
                click: (e) => {
                  setSelectedLogistic(logistic);
                  setIsLogisticDetailDrawerOpen(true);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} sticky>
                {trimString(capitalizeWords(logistic?.name), 30)}
              </Tooltip>
            </Marker>
          ),
      )} */}

      <HomeGeoJSON
        zoom={zoom}
        thematicSurveyResponses={thematicSurveyResponses}
        setIsRegionQuestionDetailDrawerOpen={setIsRegionQuestionDetailDrawerOpen}
        setSelectedRegion={setSelectedRegion}
        selectedRegionLevel={selectedRegionLevel}
        selectedThematicFromLegend={selectedThematicFromLegend}
        originalDataState={originalDataState}
        dataState={dataState}
        resetState={resetState}
        center={center}
        detailedState={detailedState}
        regencyState={regencyState}
        districtState={districtState}
      />
    </MapContainer>
  );

  // function HomeMapComponent({ setZoom, recenter, tempCenter, setRecenter, setCenter, setIconSize }) {
  //   const map = useMapEvents({
  //     zoomend: () => {
  //       const zoom = map.getZoom();
  //       setZoom(zoom);
  //       if (zoom >= 18) {
  //         setIconSize(20);
  //       } else {
  //         setIconSize(30 * scaleZoom(zoom) + 1);
  //       }
  //     },
  //   });
  //   const scaleZoom = (input) => {
  //     return input / 19;
  //   };
  //   if (recenter === true) {
  //     map.setZoom(11).flyTo([tempCenter[0], tempCenter[1]]);
  //     setRecenter(false);
  //   }
  //   return null;
  // }
}
