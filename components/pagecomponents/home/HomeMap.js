import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import styles from '../../elements/map/Home.module.css';

export default function HomeMap({
  showKoordinator,
  dataKordinator,
  showRelawan,
  dataRelawan,
  showPemilih,
  dataPemilih,
  showBlackList,
  dataBlackList,
  handleColor,
}) {
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({ lat: -7.0335559, lng: 107.6589375 });

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      className={styles.homeMap}
    >
      <HomeMapComponent setZoom={setZoom} setCenter={setCenter} />
      <TileLayer
        className="map"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
      />
      {showKoordinator === true &&
        dataKordinator.map((m, index) => (
          <CircleMarker
            key={index}
            center={[m?.latitude, m?.longitude]}
            radius={20}
            opacity={1.0}
            pathOptions={{
              color: 'none',
              fillOpacity: 0.8,
              fillColor: handleColor(m?.occupation.name),
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              {m.name}
            </Tooltip>
          </CircleMarker>
        ))}
      {showRelawan === true &&
        dataRelawan.map(
          (m, index) =>
            m.longitude !== '' && (
              <CircleMarker
                key={index}
                center={[m?.latitude, m?.longitude]}
                radius={20}
                opacity={1.0}
                pathOptions={{
                  color: 'none',
                  fillOpacity: 0.8,
                  fillColor: handleColor(m?.occupation.name),
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent
                >
                  {m.name}
                </Tooltip>
              </CircleMarker>
            )
        )}
      {showPemilih === true &&
        dataPemilih.map(
          (m, index) =>
            m.longitude !== '' && (
              <CircleMarker
                key={index}
                center={[m?.latitude, m?.longitude]}
                radius={20}
                opacity={1.0}
                pathOptions={{
                  color: 'none',
                  fillOpacity: 0.8,
                  fillColor: handleColor(m?.occupation.name),
                }}
              ></CircleMarker>
            )
        )}
      {showBlackList === true &&
        dataBlackList.map(
          (m, index) =>
            m.longitude !== '' && (
              <CircleMarker
                key={index}
                center={[m?.latitude, m?.longitude]}
                radius={20}
                opacity={1.0}
                pathOptions={{
                  color: 'none',
                  fillOpacity: 0.8,
                  fillColor: handleColor(m?.occupation.name),
                }}
              ></CircleMarker>
            )
        )}
    </MapContainer>
  );
}

function HomeMapComponent({ setZoom, setCenter }) {
  const mapEvents = useMapEvents({
    zoomend: () => {
      // console.log(mapEvents.getZoom());
      setZoom(mapEvents.getZoom());
      setCenter(mapEvents.getCenter());
    },
    dragend: () => {
      // console.log(mapEvents.getCenter());
      setCenter(mapEvents.getCenter());
    },
  });
  return null;
}
