import dynamic from "next/dynamic";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../components/elements/map/Home.module.css";
import geojson from "./geojson";
import LayerData from "@/components/pagecomponents/home/LayerData";
import LayerFilter from "@/components/pagecomponents/home/LayerFilter";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MonitoringContext } from "@/providers/issue-providers";
import { useFindProvinceDensity } from "@/utils/services/issue";
import { isEmpty, maxBy } from "lodash";
import { Marker, Popup } from "react-leaflet";

const Map = dynamic(() => import("../../components/elements/map/Map"), {
  ssr: false,
});

const PatroliPage = ({ profile }) => {
  const { isLayerOpen, selected, selectedYear } = useContext(MonitoringContext);

  const [isMounted, setIsMounted] = useState(false);
  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);
  const [isShowGeoJSON, setIsShowGeoJSON] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [setPopupCoordinates, setSetPopupCoordinates] = useState();

  const { data: densities, isLoading: isGetDesityLoading } = useFindProvinceDensity({
    issue: selected.value,
    year: selectedYear.value,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const GeoJSONEL = useRef(null);

  const highestValue = useMemo(() => {
    if (!isEmpty(densities)) {
      const max = maxBy(densities.data, (data) => data.metadata.total_incidents);

      return max.metadata.total_incidents;
    }
    return 0;
  }, [densities]);

  const style = (feat) => {
    const featId = feat.properties.id;
    const density = densities.data[featId];

    const isHaveDensity = !isEmpty(density);

    const incident = density?.metadata?.total_incidents;

    return {
      weight: 2,
      stroke: 0,
      fillOpacity: 0.6,
      fillColor: `hsl(29, 93%, ${getSaturation(incident)})`,
    };
  };

  const getSaturation = (d) => {
    return d > 100 ? "56%" : d > 50 ? "65%" : d > 20 ? "75%" : "99%";
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
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
                  />
                  {!isGetDesityLoading && isShowGeoJSON && (
                    <GeoJSON
                      ref={GeoJSONEL}
                      attribution="&copy; credits due..."
                      data={geojson}
                      style={style}
                      onEachFeature={(feature, leafletLayer) => {
                        leafletLayer.on({
                          mouseover: () => {
                            const popupOptions = {
                              minWidth: 100,
                              maxWidth: 250,
                              className: "popup-classname",
                            };

                            leafletLayer
                              .bindPopup(() => {
                                return "<b>tooltip</b>";
                              }, popupOptions)
                              .openPopup();
                          },
                        });
                      }}
                    />
                  )}
                </>
              );
            }}
          </Map>
        </div>
      )}
      {isPopupOpen && (
        <Marker position={[]}>
          <Popup>hello</Popup>
        </Marker>
      )}
      <LayerFilter setIsShowGeoJSON={setIsShowGeoJSON} />
      {isShowGeoJSON && <LayerData />}
    </DashboardLayout>
  );
};

export default PatroliPage;
