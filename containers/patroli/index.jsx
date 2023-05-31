import dynamic from "next/dynamic";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../components/elements/map/Home.module.css";
import geojson from "./geojson";
import LayerData from "@/components/pagecomponents/home/LayerData";
import LayerFilter from "@/components/pagecomponents/home/LayerFilter";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MonitoringContext } from "@/providers/issue-providers";
import {
  useFindKabkotGeom,
  useFindLayerPinPoint,
  useFindProvinceDensity,
  useFindProvinceDensityRank,
} from "@/utils/services/issue";
import { cloneDeep, isEmpty, maxBy, random, reverse } from "lodash";
import { renderToString } from "react-dom/server";
import { AiFillAccountBook } from "react-icons/ai";
import segmentedValue from "@/utils/helpers/segmentedValue";
import MarkerTriangle from "@/components/MarkerTriangle";
import { markerColors, polColor } from "@/constants/colors";
import { useRouter } from "next/router";

const Map = dynamic(() => import("../../components/elements/map/Map"), {
  ssr: false,
});

const ZoomKabkot = ({ kabkotGeom, useMap, centroid, polygon }) => {
  const event = useMap();
  const center = centroid(kabkotGeom[0].geojson);

  event.setView(reverse(center.geometry.coordinates), 7);

  return null;
};

const MonitoringPopup = ({ province }) => {
  return (
    <div className="flex flex-col gap-2 w-[315px] py-1 z-50">
      <div className="flex flex-col gap-1">
        <div className="text-gray-400 font-bold">Provinsi</div>
        <div className="text-md font-bold">{province}</div>
      </div>
      <div className="flex flex-col border-[2px] border-gray-400 rounded-md p-2">
        <div className="text-primary text-sm">#7</div>
        <div className=" text-sm">Pencurian dengan Kekerasan</div>
        <div className="text-gray-400 text-sm">245 Kasus</div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex justify-between font-bold">
          <div className="text-gray-400 text-sm">Ranking Lain</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400 text-sm ">Kejahatan</div>
          <div className="text-primary text-sm">#7</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400 text-sm ">Bencana</div>
          <div className="text-primary text-sm">#17</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400 text-sm ">Terorisme</div>
          <div className="text-primary text-sm">#27</div>
        </div>
      </div>
      <a
        href={`${process.env.APP_BASEURL_DEFAULT}/analysis`}
        className="flex p-2 w-full bg-primary font-bold rounded-md justify-center items-center mt-2 no-underline "
      >
        <div className="text-white">Lihat detail</div>
      </a>
    </div>
  );
};

const PatroliPage = ({ profile }) => {
  const { selectedLayer, selected, selectedYear, selectedProvince, isShowGeoJSON, setIsShowGeoJSON } =
    useContext(MonitoringContext);

  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);

  const [kabkotGeom, setKabkotGeom] = useState(undefined);

  const { data: densities, isLoading: isGetDesityLoading } = useFindProvinceDensity(
    {
      issue: selected.value,
      year: selectedYear?.value,
    },
    {
      enabled: selected.id == 3 ? !!selected.value : !!selected.value && !!selectedYear?.value,
    },
  );

  const { data: ranks, isLoading: isGetRankLoading } = useFindProvinceDensityRank(
    {
      issue: selected.value,
      year: selectedYear?.value,
    },
    {
      enabled: selected.id == 3 ? !!selected.value : !!selected.value && !!selectedYear?.value,
    },
  );

  const { data: points, isLoading: isGetPointsLoading } = useFindLayerPinPoint(
    {
      ids: selectedLayer.join(","),
      issue: selected.value,
      year: selectedYear?.value,
    },
    {
      enabled: selectedLayer.length > 0,
    },
  );

  const { isLoading: isKabkotGeomLoading } = useFindKabkotGeom(selectedProvince?.id, {
    enabled: !!selectedProvince?.id,
    onSuccess: (data) => {
      setKabkotGeom(data);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const GeoJSONEL = useRef(null);

  const highestValue = useMemo(() => {
    if (!isEmpty(densities)) {
      if (selected.id == 3) {
        const max = maxBy(densities, (data) => data.jumlah_kejadian);

        return max.jumlah_kejadian;
      }
      const max = maxBy(densities, (data) => data.metadata.total_incident);

      return max.metadata.total_incident;
    }
    return 0;
  }, [densities]);

  const style = (feat) => {
    const featId = feat.properties.id;
    const density = densities.find((data) => data.id === featId);

    const incident = selected.id == 3 ? density?.jumlah_kejadian : density?.metadata?.total_incident;

    return {
      weight: 2,
      stroke: 0,
      fillOpacity: 0.6,
      fillColor: `hsl(${polColor[selected.id - 1]}, 93%, ${getSaturation(incident)})`,
    };
  };
  const styleKabkot = (feat) => {
    const featId = feat.properties.id;

    return {
      weight: 2,
      stroke: 0,
      fillOpacity: 0.6,
      fillColor: `hsl(${polColor[selected.id - 1]}, 93%, ${getSaturation(random(1, highestValue))})`,
    };
  };

  const getSaturation = (d) => {
    const segmented = segmentedValue(highestValue);

    if (d >= segmented[0]) {
      return "56%";
    }

    if (d < segmented[0] && d >= segmented[1]) {
      return "70%";
    }

    if (d < segmented[1] && d >= segmented[2]) {
      return "78%";
    }

    if (d < segmented[2] && d > segmented[3]) {
      return "88%";
    }

    return "99%";
  };

  const onEachFeature = (feature, leafletLayer) => {
    const { provinsi } = feature.properties;

    leafletLayer.on({
      mouseover: () => {
        const popupOptions = {
          className: "popup-classname",
        };

        leafletLayer.bindPopup(renderToString(<MonitoringPopup province={provinsi} />), popupOptions).openPopup();
      },
    });
  };

  return (
    <DashboardLayout
      topBarConfig={{
        isShowSearchRegion: true,
        onClickAnalysis: () => window.open("/analysis", "_self"),
        title: "Dashboard",
      }}
      title={"Dashboard · Chakra"}
      profile={profile}
    >
      {isMounted && (
        <div className="map">
          <Map className={styles.homeMap} center={cordinate} cordinate={cordinate} zoom={5.4}>
            {({
              TileLayer,
              GeoJSON,
              JSXMarker,
              useMap,
              centroid,
              polygon,
              booleanPointInPolygon,
              point,
              multiPolygon,
              Marker,
              L,
            }) => {
              return (
                <>
                  <TileLayer
                    className="map"
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
                  />

                  {!isGetDesityLoading && !selectedProvince && isShowGeoJSON && (
                    <GeoJSON
                      ref={GeoJSONEL}
                      attribution="&copy; credits due..."
                      data={geojson}
                      style={style}
                      onEachFeature={onEachFeature}
                    />
                  )}

                  {kabkotGeom && isShowGeoJSON && (
                    <>
                      <GeoJSON
                        // ref={GeoJSONEL}
                        attribution="&copy; credits due..."
                        data={kabkotGeom[0].geojson}
                        style={styleKabkot}
                        onEachFeature={onEachFeature}
                      />
                      <ZoomKabkot kabkotGeom={kabkotGeom} useMap={useMap} centroid={centroid} polygon={polygon} />
                    </>
                  )}

                  {!selectedProvince &&
                    selectedLayer.length > 0 &&
                    !isGetPointsLoading &&
                    points.map((eachPoint, i) =>
                      eachPoint.points.map((data, i2) => {
                        const tempData = cloneDeep(data);

                        return (
                          <Marker
                            key={`${i}-${i2}`}
                            position={reverse(tempData)}
                            icon={
                              new L.Icon({
                                iconUrl: `/images/map/markers/${selected.value}-${eachPoint.id}.${
                                  selected.value == "bencana" ? "svg" : "png"
                                }`,
                                iconSize: [30, 30],
                                iconAnchor: [30 / 2, 30 / 2],
                              })
                            }
                          />
                        );
                      }),
                    )}

                  {selectedProvince &&
                    densities &&
                    kabkotGeom &&
                    selectedLayer.length > 0 &&
                    !isGetPointsLoading &&
                    points.map((eachPoint, i) =>
                      eachPoint.points.map((data, i2) => {
                        const pol = multiPolygon(
                          kabkotGeom[0].geojson.features.map((data) => data.geometry.coordinates),
                        );

                        const isInsidePol = booleanPointInPolygon(data, pol);
                        return (
                          isInsidePol && (
                            <JSXMarker
                              key={`${i}-${i2}`}
                              position={[data[1] + 0.0001, data[0]]}
                              iconOptions={{
                                className: "jsx-marker",
                              }}
                            >
                              <MarkerTriangle fill={markerColors[parseInt(eachPoint.id)]}>
                                <AiFillAccountBook className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white" />
                              </MarkerTriangle>
                            </JSXMarker>
                          )
                        );
                      }),
                    )}
                </>
              );
            }}
          </Map>
        </div>
      )}

      <LayerFilter setIsShowGeoJSON={setIsShowGeoJSON} setKabkotGeom={setKabkotGeom} />
      {isShowGeoJSON && (
        <LayerData
          ranks={ranks}
          isRankLoading={isGetRankLoading}
          segmented={segmentedValue(highestValue)}
          issueId={selected.id}
        />
      )}
    </DashboardLayout>
  );
};

export default PatroliPage;
