import axios from "axios";
import L from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";

import indexMaxOfNumbers from "../../../../utils/helpers/array/indexMaxOfNumbers";
import sumNumbers from "../../../../utils/helpers/array/sumNumbers";
import jawaRegencyData from "../../../../public/geojson/jawa_regency_fix.json";
import provinceData from "../../../../public/geojson/indo_province2.json";
import { getRandomColorByKey } from "../../../../utils/helpers/getRandomColor";

export default function HomeGeoJSON({
  zoom,
  thematicSurveyResponses,
  setIsRegionQuestionDetailDrawerOpen,
  setSelectedRegion,
  selectedRegionLevel,
  selectedThematicFromLegend,
  originalDataState,
  dataState,
  resetState,
  center,
  detailedState,
  regencyState,
  districtState,
}) {
  const [resetSignal, setResetSignal] = useState(false);
  // const [selectedRegency, setSelectedRegency] = useState(null);
  const map = useMap(); // Get map instance

  useEffect(() => {
    originalDataState.setOriginalData(provinceData);
    dataState.setData(provinceData);
  }, []);

  function processGeoJSON(geojson) {
    // Proses objek GeoJSON di sini sesuai kebutuhan Anda
    const processedFeatures = geojson.features.map((feature) => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          color: "#000",
          weight: 1,
        },
      };
    });

    const processedData = {
      type: geojson.type,
      features: processedFeatures,
    };

    return processedData;
  }

  useEffect(() => {
    if (regencyState.selectedRegency !== null) {
      axios
        .get(`/geojson/district_data/regency_${regencyState.selectedRegency}.geojson`)
        .then((res) => {
          const processedData = processGeoJSON(res.data); // Memproses objek GeoJSON
          dataState.setData(processedData); // Menyetel data yang telah diproses

          // const districtIds = res.data.features.map((feature) => feature.properties.district_id);
          // districtState.setIncludedDistricts(districtIds);
          // console.log(districtIds);
          districtState.setIncludedDistricts(res.data.features.map((feature) => feature.properties.district_id));
          // console.log(districtState.includedDistricts);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [regencyState.selectedRegency]);

  useEffect(() => {
    if (districtState.includedDistricts !== null) {
      console.log(districtState.includedDistricts);
    }
  }, [districtState.includedDistricts]);

  const onEachFeature = useCallback(
    (feature, layer) => {
      if (feature?.properties?.selected) {
        layer.setStyle({
          fillColor: feature?.properties?.fillColor,
          fillOpacity: feature?.properties?.fillOpacity,
          color: "#000", // Warna border
          weight: 0.5, // Ketebalan border
        });
      } else {
        layer.setStyle({
          fillColor: `#4F5FC7`,
          fillOpacity: 0.2,
          color: "#000", // Warna border
          weight: 0.5, // Ketebalan border
        });
      }

      layer.on("click", (e) => {
        setIsRegionQuestionDetailDrawerOpen(true);
        setSelectedRegion(feature.properties);
        // setSelectedRegency(feature.properties.regency_id);
        detailedState.setIsDetailed(true);
      });
    },
    [setIsRegionQuestionDetailDrawerOpen, setSelectedRegion, map],
  );

  const style = useMemo(() => {
    return {
      weight: 0,
    };
  }, []);

  // const style = {
  //   weight: 2,
  //   opacity: 1,
  //   color: "white",
  //   fillOpacity: 0.2,
  //   stroke: 0,
  //   fillColor: "#4F5FC7",
  // };

  const ref = useRef(null);

  useEffect(() => {
    if (!thematicSurveyResponses) return;
    if (!originalDataState.originalData) return;

    // eslint-disable-next-line no-unsafe-optional-chaining
    const mappedResponses = [].concat(...thematicSurveyResponses?.map((res) => res?.responses ?? []));
    const mergedResponses = Object.values(
      mappedResponses.reduce((acc, curr) => {
        if (regencyState.selectedRegency) {
          acc[curr?.district_id] = curr;
        } else {
          // acc[curr?.regency_id] = curr;
          acc[curr?.province_id] = curr;
        }
        return acc;
      }, {}),
    );

    const newFeatures = dataState.data?.features?.map((feature) => {
      const matchedResponses = [];
      thematicSurveyResponses?.forEach((surveyResponse) => {
        const responseSummary = surveyResponse?.responses?.find((r) => {
          if (regencyState.selectedRegency) {
            return r?.district_id === feature?.properties?.district_id;
          } else {
            // return r?.regency_id === feature?.properties?.regency_id;
            return r?.province_id === feature?.properties?.province_id;
          }
        });

        // fill empty with random color
        const newColors = surveyResponse?.color.map((color, i) => {
          if (color == "") {
            return getRandomColorByKey(i);
          }
          return color;
        });

        if (responseSummary) {
          matchedResponses.push({
            question: surveyResponse?.question_name,
            options: surveyResponse?.options,
            counts: responseSummary?.count,
            total_count: sumNumbers(responseSummary?.count),
            // district_counts: responseSummary?.district_count,
            // total_district_counts: sumNumbers(responseSummary?.district_count),
            colors: newColors,
          });
        }
      });
      feature.properties.question_responses = matchedResponses;

      const index = mergedResponses.findIndex((response) => {
        if (regencyState.selectedRegency) {
          return response?.district_id === feature?.properties?.district_id;
        } else {
          // return response?.regency_id === feature?.properties?.regency_id;
          return response?.province_id === feature?.properties?.province_id;
        }
      });

      if (index === -1) {
        feature.properties.selected = false;
        return feature;
      }

      const count = mergedResponses[index].count;
      // if (selectedRegionLevel == 2) {
      //   count = mergedResponses[index].district_count;
      // }
      const total = sumNumbers(count);
      const indexMaxCount = indexMaxOfNumbers(count);
      const maxCount = count[indexMaxCount];

      // fill empty with random color
      const newColors = matchedResponses?.at(-1)?.colors?.map((color, i) => {
        if (color == "") {
          return getRandomColorByKey(i);
        }
        return color;
      });

      const color = newColors[indexMaxCount];

      feature.properties.selected =
        selectedThematicFromLegend !== null ? selectedThematicFromLegend === indexMaxCount : true;
      feature.properties.fillColor = color;
      if (!feature.properties.fillColor) {
        feature.properties.fillOpacity = 0;
      } else {
        if (regencyState.selectedRegency) {
          feature.properties.fillOpacity = (maxCount / total) * 2;
        } else {
          feature.properties.fillOpacity = (maxCount / total) * 10;
        }
      }

      return feature;
    });

    // else {
    //   const newFeatures = dataState.data?.features?.map((feature) => {
    //     const matchedResponses = [];
    //     thematicSurveyResponses?.forEach((surveyResponse) => {
    //       const responseSummary = surveyResponse?.responses?.find(
    //         (r) => r?.district_id == feature?.properties?.district_id,
    //       );

    //       // fill empty with random color
    //       const newColors = surveyResponse?.color.map((color, i) => {
    //         if (color == "") {
    //           return getRandomColorByKey(i);
    //         }
    //         return color;
    //       });

    //       if (responseSummary) {
    //         matchedResponses.push({
    //           question: surveyResponse?.question_name,
    //           options: surveyResponse?.options,
    //           counts: responseSummary?.count,
    //           total_count: sumNumbers(responseSummary?.count),
    //           // district_counts: responseSummary?.district_count,
    //           // total_district_counts: sumNumbers(responseSummary?.district_count),
    //           colors: newColors,
    //         });
    //       }
    //     });
    //     feature.properties.question_responses = matchedResponses;

    //     const index = mergedResponses.findIndex(
    //       (response) => response?.district_id == feature?.properties?.district_id,
    //     );
    //     if (index === -1) {
    //       feature.properties.selected = false;
    //       return feature;
    //     }

    //     const count = mergedResponses[index].count;
    //     // if (selectedRegionLevel == 2) {
    //     //   count = mergedResponses[index].district_count;
    //     // }
    //     const total = sumNumbers(count);
    //     const indexMaxCount = indexMaxOfNumbers(count);
    //     const maxCount = count[indexMaxCount];

    //     // fill empty with random color
    //     const newColors = matchedResponses?.at(-1)?.colors?.map((color, i) => {
    //       if (color == "") {
    //         return getRandomColorByKey(i);
    //       }
    //       return color;
    //     });

    //     const color = newColors[indexMaxCount];

    //     feature.properties.selected =
    //       selectedThematicFromLegend !== null ? selectedThematicFromLegend === indexMaxCount : true;
    //     feature.properties.fillColor = color;
    //     feature.properties.fillOpacity = (maxCount / total) * 4;

    //     return feature;
    //   });
    // }

    dataState.setData({ ...originalDataState.originalData, features: newFeatures });
  }, [thematicSurveyResponses, selectedThematicFromLegend]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.clearLayers().addData(dataState.data);
    setResetSignal((s) => !s);
  }, [dataState.data]);

  useEffect(() => {
    if (resetState.isReset !== false) {
      map.flyTo(center, 5.3);
      resetState.setIsReset(false);
    }
  }, [resetState.isReset]);

  useEffect(() => {
    map.flyTo(center, 5.3);
  }, []);

  // useEffect(() => {
  //   const handleDataChange = () => {
  //     if (dataState.data && dataState.data.length > 0) {
  //       const features = dataState.data;
  //       const bounds = L.geoJSON(features).getBounds();
  //       const center = bounds.getCenter();
  //       map.flyTo(center, 8.5);
  //     }
  //   };
  //   if (regencyState.selectedRegency !== null) {
  //     handleDataChange();
  //   }
  // }, [dataState.data, map]);

  // // Fungsi untuk menggabungkan fitur dalam sebuah FeatureCollection
  // function mergeFeatures(featureCollection) {
  //   // Memeriksa apakah FeatureCollection tidak null dan memiliki fitur
  //   if (featureCollection && featureCollection.features && featureCollection.features.length > 0) {
  //     // Mengubah FeatureCollection menjadi sebuah MultiPolygon
  //     const polygons = featureCollection.features.filter(
  //       (feature) => feature.geometry && feature.geometry.type === "Polygon",
  //     );
  //     if (polygons.length > 0) {
  //       const multiPolygon = turf.combine({ type: "FeatureCollection", features: polygons });

  //       // Menggabungkan semua polygon menjadi satu polygon tunggal
  //       const mergedFeature = turf.union(multiPolygon);

  //       // Mengembalikan fitur tunggal
  //       return mergedFeature;
  //     }
  //   }

  //   // Jika tidak ada fitur atau tidak ada polygon yang valid, mengembalikan null atau melakukan penanganan kesalahan sesuai kebutuhan
  //   return null;
  // }
  // function mergeData(featureCollection) {
  //   if (!featureCollection || featureCollection.features.length === 0) {
  //     return null;
  //   }

  //   // Buat variabel kosong untuk menyimpan fitur gabungan
  //   let mergedFeature = null;

  //   // Loop melalui setiap fitur dalam koleksi fitur
  //   featureCollection.features.forEach((feature) => {
  //     // Jika fitur gabungan masih kosong, inisialisasi dengan fitur pertama
  //     if (!mergedFeature) {
  //       mergedFeature = feature;
  //     } else {
  //       // Jika fitur gabungan sudah ada, gabungkan fitur saat ini dengan fitur gabungan
  //       mergedFeature = turf.combine([mergedFeature, feature]);
  //     }
  //   });

  //   return mergedFeature;
  // }

  // useEffect(() => {
  //   if (regencyState.selectedRegency !== null) {
  //     const mergedFeature = mergeData(dataState.data);
  //     if (mergedFeature) {
  //       const bounds = turf.bbox(mergedFeature);
  //       const center = turf.center(mergedFeature).geometry.coordinates;
  //       if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
  //         map.flyTo(center, 12);
  //       } else {
  //         console.error("Invalid center coordinates");
  //       }
  //     }
  //   }
  // }, [dataState.data, map]);

  return (
    <>
      {dataState.data ? <GeoJSON ref={ref} data={dataState.data} style={style} onEachFeature={onEachFeature} /> : <></>}
    </>
  );
}
