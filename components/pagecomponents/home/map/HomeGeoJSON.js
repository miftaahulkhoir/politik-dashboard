import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";

export default function HomeGeoJSON({ zoom }) {
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

  const [selectedFeatures, setSelectedFeatures] = useState([
    "CIKOLE",
    "GUDANGKAHURIPAN",
    "JAYAGIRI",
    "CIBODAS",
    "LANGENSARI",
    "MEKARWANGI",
    "CIBOGO",
    "SUKAJAYA",
    "SUNTENJAYA",
    "WANGUNHARJA",
    "WANGUNSARI",
    "KARYAWANGI",
    "CIHANJUANG",
    "CIHANJUANGRAHAYU",
    "CIHIDEUNG",
    "CIWARUGA",
    "CIGUGURGIRANG",
    "SARIWANGI",
    "JAMBUDIPA",
    "PADAASIH",
    "PASIRHALANG",
    "PASIRLANGU",
    "CIPADA",
    "KERTAWANGI",
    "TUGUMUKTI",
    "SADANGMEKAR",
    "CIPTAGUMATI",
    "CIKALONG",
    "CISOMANGBARAT",
    "GANJARSARI",
    "KANANGASARI",
    "MANDALASARI",
    "MANDALAMUKTI",
    "MEKARJAYA",
    "PUTERAN",
    "RENDE",
    "TENJOLAUT",
    "WANGUNJAYA",
    "CIPEUNDEUY",
    "CIHARASHAS",
    "BOJONGMEKAR",
    "CIROYOM",
    "JATIMEKAR",
    "MARGALAKSANA",
    "MARGALUYU",
    "NANGGELENG",
    "NYENANG",
    "SIRNARAJA",
    "SIRNAGALIH",
    "SUKAHAJI",
    "NGAMPRAH",
    "CIMAREME",
    "CILAME",
    "TANIMULYA",
    "CIMANGGU",
    "BOJONGKONENG",
    "MARGAJAYA",
    "MEKARSARI",
    "GADOBANGKONG",
    "SUKATANI",
    "PAKUHAJI",
    "CIPTAHARJA",
    "CIPATAT",
    "CITATAH",
    "RAJAMANDALAKULON",
    "MANDALAWANGI",
    "KERTAMUKTI",
    "NYALINDUNG",
    "GUNUNGMASIGIT",
    "CIRAWAMEKAR",
    "SUMURBANDUNG",
    "SARIMUKTI",
    "KERTAMULYA",
    "PADALARANG",
    "CIMERANG",
    "CAMPAKA MEKAR",
    "TAGOGAPU",
    "CIBURUY",
    "KERTAJAYA",
    "JAYAMEKAR",
    "LAKSANAMEKAR",
    "BATUJAJAR TIMUR",
  ]);

  useEffect(() => {
    // loadAndSaveGeoJSON();
    axios.get("/geojson/bandung_bandungbarat_v4.json").then((res) => setData(res.data));
  }, []);

  const onEachFeature = useCallback((feature, layer) => {
    if (selectedFeatures.includes(feature.properties.village)) {
      layer.options.fillColor = "yellow";
    } else {
      layer.options.fillColor = "red";
    }

    layer.on("click", (e) => {
      // e.target.setStyle({
      //   fillColor: "green",
      // });
    });
  }, []);

  const style = useMemo(() => {
    return {
      fillOpacity: 0.5,
      weight: zoom < 12 ? 0 : Math.pow(zoom, 1.2) * 0.1,
    };
  }, [zoom]);

  return <>{data ? <GeoJSON data={data} style={style} onEachFeature={onEachFeature} /> : <></>}</>;
}
