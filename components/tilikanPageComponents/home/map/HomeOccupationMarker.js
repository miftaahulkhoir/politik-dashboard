import L from "leaflet";

import { MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import trimString from "../../../../utils/helpers/trimString";

const HomeOccupationMarker = ({
  setSelectedUser,
  handleDetailCordinate,
  setTempCenter,
  setUserLogCordinate,
  m,
  iconSize,
}) => {
  return (
    <Marker
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
  );
};

export default HomeOccupationMarker;
