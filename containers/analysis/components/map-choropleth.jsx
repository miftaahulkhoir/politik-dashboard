import { useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import axios from "axios";

const Map = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/geojson/indonesia.json").then((res) => {
      setData(res.data);
    });
  }, []);

  const getRandomColor = () => {
    const colors = ["#F78A25", "#F8AC66", "#FDC694", "#FFE3CA"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const styleFeature = (feature) => {
    return {
      fillColor: getRandomColor(),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.8,
    };
  };

  if (!data) return null;

  return (
    <MapContainer
      center={[-2.548926, 118.0148634]}
      zoom={4}
      style={{ height: "400px", width: "100%", backgroundColor: "#151922" }}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      zoomControl={false}
    >
      <GeoJSON data={data} style={styleFeature} />
    </MapContainer>
  );
};

export default Map;
