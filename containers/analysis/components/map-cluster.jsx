import { useEffect } from "react";
import { MapContainer, GeoJSON, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import "leaflet/dist/leaflet.css";

import axios from "axios";

const MapCluster = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/geojson/indonesia.json").then((res) => {
      setData(res.data);
    });
  }, []);

  const styleFeature = (feature) => {
    return {
      fillColor: "#E5EAEE",
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.8,
    };
  };

  if (!data) return null;

  return (
    <div className="w-full flex gap-5">
      <MapContainer
        center={[-2.548926, 118.0148634]}
        zoom={3.4}
        style={{ height: "280px", width: "100%", backgroundColor: "#D7E7FF" }}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        zoomControl={false}
      >
        <CircleMarker
          radius={20}
          pathOptions={{ color: "#4F5FC7" }}
          stroke={false}
          fillOpacity={10}
          center={[-6.21462, 106.84513]}
        />
        <CircleMarker
          radius={20}
          pathOptions={{ color: "#4F5FC7" }}
          stroke={false}
          fillOpacity={0.7}
          center={[-3.409927, 114.847298]}
        />
        <CircleMarker
          radius={20}
          pathOptions={{ color: "#4F5FC7" }}
          stroke={false}
          fillOpacity={0.5}
          center={[5.54829, 95.323753]}
        />
        <CircleMarker
          radius={20}
          pathOptions={{ color: "#4F5FC7" }}
          stroke={false}
          fillOpacity={0.5}
          center={[-4.466667, 135.199997]}
        />
        <CircleMarker
          radius={20}
          pathOptions={{ color: "#4F5FC7" }}
          stroke={false}
          fillOpacity={2}
          center={[3.597031, 98.678513]}
        />
        <CircleMarker
          radius={20}
          pathOptions={{ color: "#4F5FC7" }}
          stroke={false}
          fillOpacity={2}
          center={[0.624693, 123.974998]}
        />

        <GeoJSON data={data} style={styleFeature} />
      </MapContainer>
      <div className="flex flex-col gap-2">
        <div className="text-white text-sm">Kepadatan</div>
        <div className="flex h-full gap-2">
          <div
            className="h-[80%] w-3 rounded-md"
            style={{
              backgroundImage: "linear-gradient(180deg, rgba(247, 37, 41, 0.5) 0%, #F72529 100%)",
            }}
          />
          <div className="h-[80%] flex flex-col justify-between">
            <div className="text-[#706E6B] text-sm">100</div>
            <div className="text-[#706E6B] text-sm">1000k</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapCluster;
