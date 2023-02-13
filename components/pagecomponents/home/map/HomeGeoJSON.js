import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GeoJSON } from "react-leaflet";

import getRandomColor from "../../../../utils/helpers/getRandomColor";

export default function HomeGeoJSON({ zoom, thematicQuestionSurveyResponse }) {
  const [data, setData] = useState(null);
  const [resetSignal, setResetSignal] = useState(false);

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

  useEffect(() => {
    // loadAndSaveGeoJSON();
    axios.get("/geojson/bandung_bandungbarat_v4.json").then((res) => setData(res.data));
  }, []);

  const onEachFeature = useCallback((feature, layer) => {
    if (feature?.properties?.selected) {
      layer.options.fillColor = getRandomColor();
      layer.options.fillOpacity = 0.7;
    } else {
      layer.options.fillColor = "#016CEE";
      layer.options.fillOpacity = 0.2;
    }

    layer.on("click", (e) => {
      // e.target.setStyle({
      //   fillColor: "green",
      // });
    });
  }, []);

  const style = useMemo(() => {
    return {
      weight: zoom < 12 ? 0 : Math.pow(zoom, 1.2) * 0.1,
    };
  }, [zoom, resetSignal]);

  const ref = useRef(null);

  useEffect(() => {
    if (!thematicQuestionSurveyResponse?.id) return;

    setData((prevData) => {
      const newFeatures = prevData?.features?.map((feature) => {
        feature.properties.selected = thematicQuestionSurveyResponse.village_id == feature?.properties.village_id;
        return feature;
      });
      return { ...prevData, features: newFeatures };
    });
  }, [thematicQuestionSurveyResponse]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.clearLayers().addData(data);
    setResetSignal((s) => !s);
  }, [data]);

  return <>{data ? <GeoJSON ref={ref} data={data} style={style} onEachFeature={onEachFeature} /> : <></>}</>;
}
