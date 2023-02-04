import axios from "axios";
import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

export default function HomeGeoJSON() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("data changed", data);
  }, [data]);

  function loadAndSaveGeoJSON() {
    const dbName = "geojson";

    const indexedDB =
      window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open(`${dbName}_DB`, 1);

    request.onupgradeneeded = function () {
      const db = request.result;
      db.createObjectStore(dbName);
    };

    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;
      const transaction = db.transaction(dbName, "readwrite");
      const store = transaction.objectStore(dbName);

      // load the data
      const query = store.get(0);
      query.onsuccess = async function () {
        console.log("query", query.result);
        if (query.result) {
          setData(query.result);
          console.log("geojson loaded from indexeddb");
        } else {
          await axios.get("/geojson/BANDUNG BARAT_small.json").then((res) => {
            setData(res.data);
            saveGeoJSON(res.data);
            console.log("geojson loaded from internet");
          });
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  function saveGeoJSON(data) {
    const dbName = "geojson";

    const indexedDB =
      window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open(`${dbName}_DB`, 1);

    request.onupgradeneeded = function () {
      const db = request.result;
      db.createObjectStore(dbName);
    };

    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;
      const transaction = db.transaction(dbName, "readwrite");
      const store = transaction.objectStore(dbName);

      store.put(data, 0);
      console.log("geojson saved to indexeddb");

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  const style = {
    fillColor: "red",
    fillOpacity: 0.5,
  };

  useEffect(() => {
    loadAndSaveGeoJSON();
  }, []);

  const onEachFeature = (feature, layer) => {
    layer.on("click", (e) => {
      console.log("clicked", e);
      console.log("feature", feature);
      e.target.setStyle({
        fillColor: "green",
      });
    });
  };

  return <>{data ? <GeoJSON data={data} style={style} onEachFeature={onEachFeature} /> : <></>}</>;
}
