import L from "leaflet";
import { default as iconRetinaUrl, default as iconUrl } from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";
import { GeoJSON, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { centroid, polygon, booleanPointInPolygon, point, multiPolygon } from "@turf/turf";

import styles from "./Map.module.css";
import { JSXMarker } from "@/components/JSXMarker";

const { MapContainer } = ReactLeaflet;

export default function Map({ children, className, cordinate, zoomTo, ...rest }) {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <>
      <MapContainer className={mapClassName} zoomControl={false} {...rest}>
        {children({
          ...ReactLeaflet,
          GeoJSON,
          Marker,
          Popup,
          JSXMarker,
          useMap,
          useMapEvent,
          centroid,
          polygon,
          booleanPointInPolygon,
          point,
          multiPolygon,
          L,
        })}
      </MapContainer>
    </>
  );
}
