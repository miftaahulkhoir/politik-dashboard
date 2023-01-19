import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import styles from '../../elements/map/Home.module.css';

export default function HomeMap({
  showKoordinator,
  dataKoordinator,
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
  const [iconSize, setIconSize] = useState(30);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      className={styles.homeMap}
    >
      <HomeMapComponent
        setZoom={setZoom}
        setCenter={setCenter}
        setIconSize={setIconSize}
      />
      <TileLayer
        className="map"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
      />
      {showKoordinator === true &&
        dataKoordinator.map((m, index) => (
          <Marker
            key={index}
            icon={
              new L.Icon({
                iconUrl: '/images/map/markers/user-koordinator.svg',
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
        dataRelawan.map(
          (m, index) =>
            m.longitude !== '' && (
              <Marker
                key={index}
                icon={
                  new L.Icon({
                    iconUrl: '/images/map/markers/user-relawan.svg',
                    iconSize: [iconSize, iconSize],
                    iconAnchor: [iconSize / 2, iconSize / 2],
                  })
                }
                position={[m?.latitude, m?.longitude]}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent
                >
                  {m.name}
                </Tooltip>
              </Marker>
            )
        )}
      {showPemilih === true &&
        dataPemilih.map(
          (m, index) =>
            m.longitude !== '' && (
              <Marker
                key={index}
                icon={
                  new L.Icon({
                    iconUrl: '/images/map/markers/user-pemilih.svg',
                    iconSize: [iconSize, iconSize],
                    iconAnchor: [iconSize / 2, iconSize / 2],
                  })
                }
                position={[m?.latitude, m?.longitude]}
              ></Marker>
            )
        )}
      {showBlackList === true &&
        dataBlackList.map(
          (m, index) =>
            m.longitude !== '' && (
              <Marker
                key={index}
                icon={
                  new L.Icon({
                    iconUrl: '/images/map/markers/user-blacklist.svg',
                    iconSize: [iconSize, iconSize],
                    iconAnchor: [iconSize / 2, iconSize / 2],
                  })
                }
                position={[m?.latitude, m?.longitude]}
              ></Marker>
            )
        )}
    </MapContainer>
  );
}

function HomeMapComponent({ setZoom, setCenter, setIconSize }) {
  const scaleZoom = (input) => {
    return input / 19;
  };

  const mapEvents = useMapEvents({
    zoomend: () => {
      const zoom = mapEvents.getZoom();
      setZoom(zoom);
      setCenter(mapEvents.getCenter());

      setIconSize(40 * scaleZoom(zoom) + 1);
    },
    dragend: () => {
      setCenter(mapEvents.getCenter());
    },
  });
  return null;
}
