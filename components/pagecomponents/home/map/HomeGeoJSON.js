import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GeoJSON } from "react-leaflet";

import indexMaxOfNumbers from "../../../../utils/helpers/array/indexMaxOfNumbers";
import sumNumbers from "../../../../utils/helpers/array/sumNumbers";
import { getRandomColorByKey } from "../../../../utils/helpers/getRandomColor";

export default function HomeGeoJSON({
  zoom,
  thematicSurveyResponses,
  setIsRegionQuestionDetailDrawerOpen,
  setSelectedRegion,
}) {
  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  const [resetSignal, setResetSignal] = useState(false);

  useEffect(() => {}, [data]);

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
    axios.get("/geojson/kotabandung_kotacimahi_bandung_bandungbarat_v6.json").then((res) => {
      setOriginalData(res.data);
      setData(res.data);
    });
  }, []);

  const onEachFeature = useCallback(
    (feature, layer) => {
      if (feature?.properties?.selected) {
        layer.options.fillColor = feature?.properties?.fillColor;
        layer.options.fillOpacity = feature?.properties?.fillOpacity;
      } else {
        layer.options.fillColor = "#016CEE";
        layer.options.fillOpacity = 0.2;
      }

      layer.on("click", (e) => {
        setIsRegionQuestionDetailDrawerOpen(true);
        setSelectedRegion(feature.properties);
      });
    },
    [setIsRegionQuestionDetailDrawerOpen, setSelectedRegion],
  );

  const style = useMemo(() => {
    return {
      weight: zoom < 12 ? 0 : Math.pow(zoom, 1.2) * 0.1,
    };
  }, [zoom, resetSignal]);

  const ref = useRef(null);

  useEffect(() => {
    if (!thematicSurveyResponses) return;
    if (!originalData) return;

    console.log(thematicSurveyResponses);

    // eslint-disable-next-line no-unsafe-optional-chaining
    const mappedResponses = [].concat(...thematicSurveyResponses?.map((res) => res?.responses ?? []));
    const mergedResponses = Object.values(
      mappedResponses.reduce((acc, curr) => {
        acc[curr?.village_id] = curr;
        return acc;
      }, {}),
    );

    // console.log("merged", mergedResponses);

    const newFeatures = originalData?.features?.map((feature) => {
      const matchedResponses = [];
      thematicSurveyResponses?.forEach((surveyResponse) => {
        const responseSummary = surveyResponse?.responses?.find(
          (r) => r?.village_id == feature?.properties?.village_id,
        );

        if (responseSummary) {
          matchedResponses.push({
            question: surveyResponse?.question_name,
            options: surveyResponse?.options,
            counts: responseSummary?.count,
            total_count: sumNumbers(responseSummary?.count),
            district_counts: responseSummary?.district_count,
            total_district_counts: sumNumbers(responseSummary?.district_count),
            colors: surveyResponse?.color,
          });
        }
      });
      feature.properties.question_responses = matchedResponses;

      const index = mergedResponses.findIndex((response) => response?.village_id == feature?.properties?.village_id);
      if (index === -1) {
        feature.properties.selected = false;
        return feature;
      }

      const count = mergedResponses[index].count;
      const total = sumNumbers(count);
      const indexMaxCount = indexMaxOfNumbers(count);
      const maxCount = count[indexMaxCount];

      const color = matchedResponses?.at(-1)?.colors[indexMaxCount] || getRandomColorByKey(indexMaxCount);
      console.log("matched", matchedResponses.at(-1));
      console.log("color", color);

      feature.properties.selected = true;
      feature.properties.fillColor = color;
      feature.properties.fillOpacity = maxCount / total;

      return feature;
    });

    setData({ ...originalData, features: newFeatures });
  }, [originalData, thematicSurveyResponses]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.clearLayers().addData(data);
    setResetSignal((s) => !s);
  }, [data]);

  return <>{data ? <GeoJSON ref={ref} data={data} style={style} onEachFeature={onEachFeature} /> : <></>}</>;
}
