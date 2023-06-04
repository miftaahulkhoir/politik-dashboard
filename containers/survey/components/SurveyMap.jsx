import L from "leaflet";
import LIST_OCCUPATIONS from "../data/occupations";

import styles from "../../../components/elements/map/Home.module.css";
import React, { useCallback, useContext, useRef, useState, useEffect } from "react";
import { isEmpty, reverse, keyBy, cloneDeep } from "lodash";
import { SurveyMapContext } from "../SurveyMapContext";
import geojson from "../geojson";

import { Marker } from "react-leaflet";

import { useGetKabkotGeom } from "@/utils/services/region";
import { useFindLayerPinPoint } from "@/utils/services/issue";

import Map from "../../../components/elements/map/Map";
import { getRandomColorByKey } from "@/utils/helpers/getRandomColor";

const ZoomKabkot = ({ kabkotGeom, useMap, centroid, polygon }) => {
  const event = useMap();
  const center = centroid(kabkotGeom.geojson);

  event.setView(reverse(center.geometry.coordinates), 7);

  return null;
};

const generateNumberWithMax = (maxLimit) => {
  if (!maxLimit) return;
  let rand = Math.random() * maxLimit;

  rand = Math.floor(rand);

  return rand;
};

const SurveyMap = () => {
  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);
  const {
    selectedOccupation,
    selectedSurveyQuestion,
    setIsShowDrawer,
    setSelectedPolygonProperty,
    selectedProvince,
    setKabkotGeom,
    kabkotGeom,
  } = useContext(SurveyMapContext);

  const GeoJSONEL = useRef(null);
  const [iconSize, setIconSize] = useState(30);

  useGetKabkotGeom(selectedProvince?.id, {
    enabled: !!selectedProvince?.id,
    onSuccess: (data) => {
      setKabkotGeom(data?.[0]);
    },
  });

  const { data: points, isLoading: isGetPointsLoading } = useFindLayerPinPoint(
    {
      ids: Object.keys(selectedOccupation)
        .filter((item) => !!selectedOccupation[item])
        .join(),
    },
    {
      enabled: Boolean(Object.values(selectedOccupation).filter((item) => item).length),
    },
  );

  const pinPoints = keyBy(points, "id");

  const [isMounted, setIsMounted] = useState(false);

  const style = useCallback(
    (feature) => {
      const data = selectedSurveyQuestion?.data?.find((item) => item.id === feature.properties.id);
      let maxCount = null;
      let colorIndex = undefined;
      if (data) {
        maxCount = Math.max(...data.counts);
        colorIndex = maxCount ? data?.counts?.findIndex((count) => count === maxCount) : undefined;
      }

      return {
        weight: 2,
        opacity: 1,
        color: "white",
        fillOpacity: 0.6,
        stroke: 0,
        fillColor: colorIndex !== undefined ? selectedSurveyQuestion.colors[colorIndex] : "#F78A25",
      };
    },
    [selectedSurveyQuestion],
  );

  const styleKabkot = useCallback(
    (feature) => {
      const data = selectedSurveyQuestion?.data?.find((item) => item.id === kabkotGeom?.id);
      let maxCount = null;
      let colorIndex = undefined;
      if (data) {
        maxCount = Math.max(...data.counts);
        colorIndex = maxCount ? data?.counts?.findIndex((count) => count === maxCount) : undefined;
      }

      return {
        weight: 0.5,
        color: "#ffffff",
        fillOpacity: colorIndex === undefined ? 0 : 0.6,
        fillColor:
          colorIndex !== undefined &&
          getRandomColorByKey(generateNumberWithMax(selectedSurveyQuestion?.options?.length)),
      };
    },
    [kabkotGeom?.id, selectedSurveyQuestion?.data, selectedSurveyQuestion?.options?.length],
  );

  const onEachFeature = useCallback(
    (feature, layer) => {
      layer.on({
        click: (e) => {
          setSelectedPolygonProperty(feature.properties);
          setIsShowDrawer(true);
        },
      });
    },
    [setIsShowDrawer, setSelectedPolygonProperty],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // const coordinators = users.filter((user) => user.occupation.level === 2);
  // const enumerators = users.filter((user) => user.occupation.level === 3);
  // const respondents = users.filter((user) => user.occupation.level === 4);
  // const blackList = users.filter((user) => user.occupation.level === 5);

  return (
    <div>
      {isMounted && (
        <Map className={styles.homeMap} center={cordinate} cordinate={cordinate} zoom={5.4}>
          {({ TileLayer, GeoJSON, useMap, centroid, polygon, multiPolygon, booleanPointInPolygon }) => {
            return (
              <>
                <TileLayer
                  className="map"
                  url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
                />
                {isEmpty(selectedProvince) &&
                  !isEmpty(selectedOccupation) &&
                  selectedOccupation[2] &&
                  pinPoints[2]?.points?.map((user, index) => (
                    <Marker
                      key={`${pinPoints[2].id}-${index}`}
                      icon={
                        new L.Icon({
                          iconUrl: "/images/map/markers/user-koordinator.svg",
                          iconSize: [iconSize, iconSize],
                          iconAnchor: [iconSize / 2, iconSize / 2],
                        })
                      }
                      position={[user[1], user[0]]}
                    />
                  ))}
                {isEmpty(selectedProvince) &&
                  !isEmpty(selectedOccupation) &&
                  selectedOccupation[3] &&
                  pinPoints[3]?.points?.map((user, index) => (
                    <Marker
                      key={`${pinPoints[3].id}-${index}`}
                      icon={
                        new L.Icon({
                          iconUrl: "/images/map/markers/user-relawan.svg",
                          iconSize: [iconSize, iconSize],
                          iconAnchor: [iconSize / 2, iconSize / 2],
                        })
                      }
                      position={[user[1], user[0]]}
                    />
                  ))}
                {isEmpty(selectedProvince) &&
                  !isEmpty(selectedOccupation) &&
                  selectedOccupation[4] &&
                  pinPoints[4]?.points?.map((user, index) => (
                    <Marker
                      key={`${pinPoints[4].id}-${index}`}
                      icon={
                        new L.Icon({
                          iconUrl: "/images/map/markers/user-pemilih.svg",
                          iconSize: [iconSize, iconSize],
                          iconAnchor: [iconSize / 2, iconSize / 2],
                        })
                      }
                      position={[user[1], user[0]]}
                    />
                  ))}
                {isEmpty(selectedProvince) &&
                  !isEmpty(selectedOccupation) &&
                  selectedOccupation[5] &&
                  pinPoints[5]?.points?.map((user, index) => (
                    <Marker
                      key={`${pinPoints[5].id}-${index}`}
                      icon={
                        new L.Icon({
                          iconUrl: "/images/map/markers/user-blacklist.svg",
                          iconSize: [iconSize, iconSize],
                          iconAnchor: [iconSize / 2, iconSize / 2],
                        })
                      }
                      position={[user[1], user[0]]}
                    />
                  ))}

                {!isEmpty(selectedProvince) &&
                  !isEmpty(kabkotGeom) &&
                  points?.map((eachPoint, i) =>
                    eachPoint.points.map((data, i2) => {
                      const pol = multiPolygon(kabkotGeom.geojson.features.map((data) => data.geometry.coordinates));

                      const isInsidePol = booleanPointInPolygon(data, pol);
                      const occupation = LIST_OCCUPATIONS.find((occupation) => occupation.level === eachPoint.id);
                      return (
                        isInsidePol && (
                          <Marker
                            key={`${i}-${i2}`}
                            icon={
                              new L.Icon({
                                iconUrl: `/images/map/markers/user-${occupation.label}.svg`,
                                iconSize: [iconSize, iconSize],
                                iconAnchor: [iconSize / 2, iconSize / 2],
                              })
                            }
                            position={[data[1] + 0.0001, data[0]]}
                          />
                        )
                      );
                    }),
                  )}

                {selectedSurveyQuestion && isEmpty(kabkotGeom) && (
                  <GeoJSON
                    ref={GeoJSONEL}
                    attribution="&copy; credits due..."
                    data={geojson}
                    style={style}
                    onEachFeature={onEachFeature}
                  />
                )}
                {!isEmpty(kabkotGeom) && (
                  <>
                    <GeoJSON
                      key={Math.random()}
                      attribution="&copy; credits due..."
                      data={kabkotGeom.geojson}
                      style={styleKabkot}
                      onEachFeature={onEachFeature}
                    />
                    <ZoomKabkot kabkotGeom={kabkotGeom} useMap={useMap} centroid={centroid} polygon={polygon} />
                  </>
                )}
              </>
            );
          }}
        </Map>
      )}
    </div>
  );
};

export default SurveyMap;
