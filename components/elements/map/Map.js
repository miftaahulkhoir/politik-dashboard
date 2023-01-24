import { useCallback, useEffect } from "react";
import L, { map, marker, Point } from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import styles from "./Map.module.css";

const { MapContainer, useMap } = ReactLeaflet;

function Zoom({ cordinate, zoomTo }) {
  const map = useMap();
  map.flyTo(cordinate, zoomTo);
}

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
        {children(ReactLeaflet)}
        <Zoom cordinate={cordinate} zoomTo={zoomTo} />
      </MapContainer>
    </>
  );
}
