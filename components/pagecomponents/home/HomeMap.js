import axios from "axios";
import "leaflet/dist/leaflet.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";

import styles from "../../elements/map/Home.module.css";

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
}) {
  const [zoom, setZoom] = useState(11);
  const [iconSize, setIconSize] = useState(30);
  // const [polygonCordinate, setpolygonCordinate] = useState([]);
  const [logType, setLogType] = useState("");
  const [map, setMap] = useState(null);

  const handleDetailCordinate = (userid, name, type) => {
    setLogType(type);
    axios
      .get(
        `${process.env.APP_BASEURL}api/data-mapping?userid=${userid}&from=${moment.utc().local().format("Y-MM-DD")} 00:00:00&until=${moment
          .utc()
          .local()
          .format("Y-MM-DD")} 23:59:00`,
      )
      .then((res) => {
        const arr = [];
        res.data.data.forEach((element, index) => {
          axios
            .get(`https://api.geoapify.com/v1/geocode/reverse?lat=${element?.latitude}&lon=${element?.longitude}&apiKey=5523a1bf84d64e849bdd9a6ca7af26e2`)
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
          // setpolygonCordinate((prev) => [
          //   ...prev,
          //   [element.latitude, element.longitude],
          // ]);
        });
        map.flyTo([res.data.data[0]?.latitude, res.data.data[0]?.longitude]);
      })
      .catch((err) => {});
  };

  return (
    <MapContainer center={center} zoom={zoom} zoomControl={false} ref={setMap} className={styles.homeMap}>
      <HomeMapComponent
        setZoom={setZoom}
        recenter={recenter}
        tempCenter={tempCenter}
        setCenter={setCenter}
        setRecenter={setRecenter}
        setIconSize={setIconSize}
      />
      <TileLayer
        className="map"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
      />
      {showKoordinator === true &&
        userLogCordinate === false &&
        dataKoordinator.map((m, index) => (
          <Marker
            key={index}
            eventHandlers={{
              click: (e) => {
                handleDetailCordinate(m.id, m.name, "koordinator"), setTempCenter([m.latitude, m.longitude]), setUserLogCordinate(true);
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
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              {m.name}
            </Tooltip>
          </Marker>
        ))}
      {showRelawan === true &&
        userLogCordinate === false &&
        dataRelawan.map(
          (m, index) =>
            m.longitude !== "" && (
              <Marker
                key={index}
                eventHandlers={{
                  click: (e) => {
                    handleDetailCordinate(m.id, m.name, "relawan"), setTempCenter([m.latitude, m.longitude]), setUserLogCordinate(true);
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
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                  {m.name}
                </Tooltip>
              </Marker>
            ),
        )}
      {showPemilih === true &&
        userLogCordinate === false &&
        dataPemilih.map(
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
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                  {m.name}
                </Tooltip>
              </Marker>
            ),
        )}
      {showBlackList === true &&
        userLogCordinate === false &&
        dataBlackList.map(
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
              ></Marker>
            ),
        )}
      {userLogCordinate === true && (
        <>
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
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                {m.name}
              </Tooltip>
            </Marker>
          ))}
          {/* <Polyline
            pathOptions={{ color: "red" }}
            positions={polygonCordinate}
          /> */}
        </>
      )}
    </MapContainer>
  );
}

function HomeMapComponent({ setZoom, recenter, tempCenter, setRecenter, setCenter, setIconSize }) {
  const scaleZoom = (input) => {
    return input / 19;
  };

  const mapEvents = useMapEvents({
    zoomend: () => {
      const zoom = mapEvents.getZoom();
      // setZoom(zoom);
      // setCenter(mapEvents.getCenter());
      setIconSize(40 * scaleZoom(zoom) + 1);
    },
    // dragend: () => {
    //   setCenter(mapEvents.getCenter());
    // },
  });

  if (recenter === true) {
    mapEvents.setZoom(11).flyTo([tempCenter[0], tempCenter[1]]);
    setRecenter(false);
  }

  return null;
}
