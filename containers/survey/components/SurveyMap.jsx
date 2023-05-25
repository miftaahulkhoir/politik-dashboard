import dynamic from "next/dynamic";
import L from "leaflet";

import styles from "../../../components/elements/map/Home.module.css";
import React, { useContext, useRef, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { SurveyMapContext } from "../SurveyMapContext";
import geojson from "../geojson";
import users from "../data/users";
import { Marker } from "react-leaflet";
import SurveyQuestionLegend from "./SurveyQuestionLegend";

const Map = dynamic(() => import("../../../components/elements/map/Map"), {
  ssr: false,
});

const SurveyMap = () => {
  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);
  const { selectedOccupation, selectedSurveyQuestion } = useContext(SurveyMapContext);
  const GeoJSONEL = useRef(null);
  const [iconSize, setIconSize] = useState(30);

  const style = {
    weight: 2,
    opacity: 1,
    color: "white",
    fillOpacity: 0.2,
    fillColor: "#F78A25",
  };

  const coordinators = users.filter((user) => user.occupation.level === 2);
  const enumerators = users.filter((user) => user.occupation.level === 3);
  const respondents = users.filter((user) => user.occupation.level === 4);
  const blackList = users.filter((user) => user.occupation.level === 5);

  return (
    <div>
      <Map className={styles.homeMap} center={cordinate} cordinate={cordinate} zoom={5.4}>
        {({ TileLayer, GeoJSON }) => {
          return (
            <>
              <TileLayer
                className="map"
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
              />
              {!isEmpty(selectedOccupation) &&
                selectedOccupation.includes(2) &&
                coordinators.map((user, index) => (
                  <Marker
                    key={user.id}
                    eventHandlers={{
                      click: (e) => {
                        // setSelectedUser(m);
                        // handleDetailCordinate(m.id, m.name, "koordinator");
                        // setTempCenter([m.latitude, m.longitude]);
                        // setUserLogCordinate(true);
                      },
                    }}
                    icon={
                      new L.Icon({
                        iconUrl: "/images/map/markers/user-koordinator.svg",
                        iconSize: [iconSize, iconSize],
                        iconAnchor: [iconSize / 2, iconSize / 2],
                      })
                    }
                    position={[user.latitude, user.longitude]}
                  />
                ))}
              {!isEmpty(selectedOccupation) &&
                selectedOccupation.includes(3) &&
                enumerators.map((user, index) => (
                  <Marker
                    key={user.id}
                    eventHandlers={{
                      click: (e) => {
                        // setSelectedUser(m);
                        // handleDetailCordinate(m.id, m.name, "koordinator");
                        // setTempCenter([m.latitude, m.longitude]);
                        // setUserLogCordinate(true);
                      },
                    }}
                    icon={
                      new L.Icon({
                        iconUrl: "/images/map/markers/user-relawan.svg",
                        iconSize: [iconSize, iconSize],
                        iconAnchor: [iconSize / 2, iconSize / 2],
                      })
                    }
                    position={[user.latitude, user.longitude]}
                  />
                ))}
              {!isEmpty(selectedOccupation) &&
                selectedOccupation.includes(4) &&
                respondents.map((user, index) => (
                  <Marker
                    key={user.id}
                    eventHandlers={{
                      click: (e) => {
                        // setSelectedUser(m);
                        // handleDetailCordinate(m.id, m.name, "koordinator");
                        // setTempCenter([m.latitude, m.longitude]);
                        // setUserLogCordinate(true);
                      },
                    }}
                    icon={
                      new L.Icon({
                        iconUrl: "/images/map/markers/user-pemilih.svg",
                        iconSize: [iconSize, iconSize],
                        iconAnchor: [iconSize / 2, iconSize / 2],
                      })
                    }
                    position={[user.latitude, user.longitude]}
                  />
                ))}
              {!isEmpty(selectedOccupation) &&
                selectedOccupation.includes(5) &&
                blackList.map((user, index) => (
                  <Marker
                    key={user.id}
                    eventHandlers={{
                      click: (e) => {
                        // setSelectedUser(m);
                        // handleDetailCordinate(m.id, m.name, "koordinator");
                        // setTempCenter([m.latitude, m.longitude]);
                        // setUserLogCordinate(true);
                      },
                    }}
                    icon={
                      new L.Icon({
                        iconUrl: "/images/map/markers/user-blacklist.svg",
                        iconSize: [iconSize, iconSize],
                        iconAnchor: [iconSize / 2, iconSize / 2],
                      })
                    }
                    position={[user.latitude, user.longitude]}
                  />
                ))}
              <GeoJSON ref={GeoJSONEL} attribution="&copy; credits due..." data={geojson} style={style} />
            </>
          );
        }}
      </Map>
      {selectedSurveyQuestion && <SurveyQuestionLegend />}
    </div>
  );
};

export default SurveyMap;
