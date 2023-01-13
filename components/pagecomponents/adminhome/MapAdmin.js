import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import capitalizeWords from '../../../utils/capitalizeWords';

export default function MapAdmin() {
  const [zoom, setZoom] = useState(0);
  useEffect(() => {
    console.log('zoom', zoom);
  }, [zoom]);

  const [data, setData] = useState([
    { position: ['-6.9156', '107.6845'], value: 501, role: 'relawan' },
    { position: ['-6.9504', '107.5513'], value: 182, role: 'blacklist' },
    { position: ['-6.8831', '107.5530'], value: 852, role: 'blacklist' },
    { position: ['-7.0035', '107.5793'], value: 419, role: 'relawan' },
    { position: ['-6.9172', '107.5695'], value: 291, role: 'relawan' },
    { position: ['-6.9256', '107.6542'], value: 1351, role: 'relawan' },
    { position: ['-6.8976', '107.6320'], value: 445, role: 'relawan' },
    { position: ['-7.0011', '107.6844'], value: 1788, role: 'blacklist' },
    { position: ['-6.9877', '107.6732'], value: 1174, role: 'pemilih' },
    { position: ['-6.9597', '107.6117'], value: 763, role: 'blacklist' },
    { position: ['-6.9459', '107.6887'], value: 318, role: 'coordinator' },
    { position: ['-6.9732', '107.5553'], value: 1942, role: 'relawan' },
    { position: ['-7.0124', '107.6535'], value: 85, role: 'pemilih' },
    { position: ['-6.9972', '107.6735'], value: 1437, role: 'pemilih' },
    { position: ['-6.9471', '107.5014'], value: 1553, role: 'relawan' },
    { position: ['-6.9759', '107.6537'], value: 1773, role: 'relawan' },
    { position: ['-6.9454', '107.5853'], value: 1079, role: 'pemilih' },
    { position: ['-6.9122', '107.4935'], value: 596, role: 'blacklist' },
    { position: ['-6.9737', '107.4957'], value: 1684, role: 'coordinator' },
    { position: ['-6.8843', '107.6629'], value: 24, role: 'pemilih' },
    { position: ['-6.9329', '107.6112'], value: 1306, role: 'pemilih' },
    { position: ['-6.9988', '107.5850'], value: 323, role: 'relawan' },
    { position: ['-6.9326', '107.5359'], value: 1407, role: 'coordinator' },
    { position: ['-6.8733', '107.6252'], value: 197, role: 'coordinator' },
    { position: ['-6.9111', '107.5668'], value: 1583, role: 'pemilih' },
    { position: ['-6.9554', '107.6166'], value: 1473, role: 'blacklist' },
    { position: ['-6.9713', '107.5128'], value: 1187, role: 'coordinator' },
    { position: ['-6.9789', '107.6971'], value: 1921, role: 'coordinator' },
    { position: ['-6.9145', '107.6268'], value: 1241, role: 'pemilih' },
    { position: ['-6.9840', '107.6043'], value: 1727, role: 'blacklist' },
    { position: ['-6.9825', '107.5312'], value: 762, role: 'blacklist' },
    { position: ['-6.9929', '107.5655'], value: 1789, role: 'pemilih' },
    { position: ['-6.8912', '107.4987'], value: 1457, role: 'blacklist' },
    { position: ['-6.9636', '107.6229'], value: 1360, role: 'pemilih' },
    { position: ['-6.8894', '107.6857'], value: 1506, role: 'coordinator' },
    { position: ['-6.9897', '107.5836'], value: 93, role: 'coordinator' },
    { position: ['-6.8891', '107.6608'], value: 1579, role: 'blacklist' },
    { position: ['-6.8674', '107.5331'], value: 1616, role: 'coordinator' },
    { position: ['-6.8869', '107.5698'], value: 294, role: 'pemilih' },
    { position: ['-6.8943', '107.5161'], value: 1418, role: 'relawan' },
    { position: ['-6.9530', '107.5292'], value: 626, role: 'pemilih' },
    { position: ['-6.8906', '107.6912'], value: 1101, role: 'blacklist' },
    { position: ['-6.9575', '107.5172'], value: 941, role: 'coordinator' },
    { position: ['-6.9584', '107.5538'], value: 227, role: 'relawan' },
    { position: ['-6.9772', '107.4910'], value: 1868, role: 'blacklist' },
    { position: ['-6.9189', '107.6186'], value: 1179, role: 'pemilih' },
    { position: ['-6.9320', '107.6281'], value: 1857, role: 'pemilih' },
    { position: ['-6.8741', '107.5880'], value: 476, role: 'relawan' },
    { position: ['-6.9714', '107.6624'], value: 928, role: 'relawan' },
    { position: ['-6.8676', '107.5820'], value: 95, role: 'pemilih' },
  ]);

  const getIconSize = (value, min = 0) => {
    // zoom range => [0,18] | 0 kelihatan 1 bumi
    const scaledZoom = (zoom + 1) / 19; // range => [0,1]
    const size = Math.sqrt(value) * scaledZoom * 0.8;

    return size > min ? size : min;
  };

  const getIconUrl = (role) => {
    const baseurl = '/images/map/markers/';
    if (role === 'coordinator') return baseurl + 'circle-blue.png';
    if (role === 'relawan') return baseurl + 'circle-green.png';
    if (role === 'pemilih') return baseurl + 'circle-yellow.png';
    if (role === 'blacklist') return baseurl + 'circle-black.png';
  };

  return (
    <MapContainer
      style={{ height: '600px', width: '100%' }}
      center={[-6.912306, 107.625645]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <MapAdminDetails setZoom={setZoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((location, index) => {
        console.log('location', index, location);
        const iconSize = getIconSize(location.value, 10);
        const iconAnchor = iconSize / 2;
        const icon = L.icon({
          iconUrl: getIconUrl(location.role),
          iconSize: [iconSize, iconSize],
          iconAnchor: [iconAnchor, iconAnchor],
        });
        return (
          <Marker
            key={index}
            icon={icon}
            position={location.position}
            riseOnHover
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
            }}
          >
            <Popup>
              {capitalizeWords(location.role)}: {location.value}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

function MapAdminDetails({ setZoom }) {
  const map = useMapEvents({
    zoom: () => {
      const zoom = map.getZoom();
      setZoom(zoom);
    },
  });
  return null;
}
