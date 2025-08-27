import dynamic from "next/dynamic";
import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { renderToString } from "react-dom/server";
import styles from "../../components/elements/map/Home.module.css";
import geojson from "./geojson";
import LayerData from "@/components/pagecomponents/home/LayerData";
import LayerFilter from "@/components/pagecomponents/home/LayerFilter";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MonitoringContext } from "@/providers/issue-providers";
import { useFindKabkotGeom } from "@/utils/services/issue";
import { isEmpty, maxBy, reverse } from "lodash";
import segmentedValue from "@/utils/helpers/segmentedValue";

const Map = dynamic(() => import("../../components/elements/map/Map"), {
  ssr: false,
});

const ZoomKabkot = ({ kabkotGeom, useMap, centroid, polygon }) => {
  const event = useMap();
  const center = centroid(kabkotGeom[0].geojson);

  event.setView(reverse(center.geometry.coordinates), 7);

  return null;
};

const MonitoringPopup = ({ province, data }) => {
  const rank = data?.rank || Math.floor(Math.random() * 34) + 1;
  const kejadian = data?.jumlah_kejadian || 0;
  const jenisBencana = ["Banjir", "Gempa Bumi", "Tanah Longsor", "Puting Beliung", "Kebakaran Hutan"];
  const jenisUtama = jenisBencana[Math.floor(Math.random() * jenisBencana.length)];

  return (
    <div className="flex flex-col gap-2 w-[315px] py-1 z-50">
      <div className="flex flex-col gap-1">
        <div className="text-gray-400 font-bold">Provinsi</div>
        <div className="text-md font-bold">{province}</div>
      </div>
      <div className="flex flex-col border-[2px] border-gray-400 rounded-md p-2">
        <div className="text-primary text-sm">#{rank}</div>
        <div className=" text-sm">{jenisUtama}</div>
        <div className="text-gray-400 text-sm">{kejadian} Kasus</div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex justify-between font-bold">
          <div className="text-gray-400 text-sm">Ranking Lain</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400 text-sm ">Kejahatan</div>
          <div className="text-primary text-sm">#{rank + 2}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400 text-sm ">Bencana</div>
          <div className="text-primary text-sm">#{rank}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400 text-sm ">Terorisme</div>
          <div className="text-primary text-sm">#{rank + 10}</div>
        </div>
      </div>
      {/* <div
        // href={`${process.env.APP_BASEURL_DEFAULT}/analysis`}
        className="flex p-2 w-full bg-primary font-bold rounded-md justify-center items-center mt-2 no-underline "
      >
        <div className="text-white">Lihat detail</div>
      </div> */}
    </div>
  );
};

const PatroliPage = ({ profile }) => {
  const { selectedLayer, selected, selectedProvince, isShowGeoJSON, setIsShowGeoJSON } = useContext(MonitoringContext);

  const [isMounted, setIsMounted] = useState(false);
  const [selectedProvinceForZoom, setSelectedProvinceForZoom] = useState(null);
  // eslint-disable-next-line no-loss-of-precision
  const [cordinate] = useState([-2.0459326720699523, 122.07302997496033]);

  const [kabkotGeom, setKabkotGeom] = useState(undefined);
  const [kabkotData, setKabkotData] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);

  // Fungsi untuk zoom ke provinsi berdasarkan pilihan dropdown
  const zoomToSelectedProvince = useCallback(async () => {
    if (!selectedProvince || selectedProvince.id === 0 || !mapInstance) return;

    try {
      // Cari feature provinsi di geojson berdasarkan nama
      const provinceFeature = geojson[0].features.find(
        (feature) => feature.properties.provinsi === selectedProvince.name,
      );

      if (provinceFeature && mapInstance) {
        // Import leaflet untuk menggunakan L.geoJSON
        const L = (await import("leaflet")).default;

        // Buat temporary layer untuk mendapatkan bounds
        const tempLayer = L.geoJSON(provinceFeature);
        const bounds = tempLayer.getBounds();

        // Zoom ke bounds provinsi
        mapInstance.fitBounds(bounds, { padding: [20, 20] });
      }
    } catch (error) {
      console.error("Error zooming to province:", error);
    }
  }, [selectedProvince, mapInstance]);

  // Effect untuk zoom ketika provinsi dipilih
  useEffect(() => {
    if (selectedProvince && selectedProvince.id !== 0) {
      zoomToSelectedProvince();
    }
  }, [selectedProvince, zoomToSelectedProvince]);

  const staticDensities = useMemo(
    () => [
      { id: 1, provinsi: "Nusa Tenggara Barat", jumlah_kejadian: 45, metadata: { total_incident: 45 } },
      { id: 2, provinsi: "Gorontalo", jumlah_kejadian: 23, metadata: { total_incident: 23 } },
      { id: 3, provinsi: "Sulawesi Tenggara", jumlah_kejadian: 67, metadata: { total_incident: 67 } },
      { id: 4, provinsi: "DI Yogyakarta", jumlah_kejadian: 12, metadata: { total_incident: 12 } },
      { id: 5, provinsi: "Jawa Tengah", jumlah_kejadian: 89, metadata: { total_incident: 89 } },
      { id: 6, provinsi: "Banten", jumlah_kejadian: 34, metadata: { total_incident: 34 } },
      { id: 7, provinsi: "Jawa Timur", jumlah_kejadian: 156, metadata: { total_incident: 156 } },
      { id: 8, provinsi: "Maluku Utara", jumlah_kejadian: 28, metadata: { total_incident: 28 } },
      { id: 9, provinsi: "Papua Barat", jumlah_kejadian: 19, metadata: { total_incident: 19 } },
      { id: 10, provinsi: "Sulawesi Selatan", jumlah_kejadian: 78, metadata: { total_incident: 78 } },
      { id: 11, provinsi: "Aceh", jumlah_kejadian: 56, metadata: { total_incident: 56 } },
      { id: 12, provinsi: "Jawa Barat", jumlah_kejadian: 134, metadata: { total_incident: 134 } },
      { id: 13, provinsi: "Papua", jumlah_kejadian: 41, metadata: { total_incident: 41 } },
      { id: 14, provinsi: "Nusa Tenggara Timur", jumlah_kejadian: 52, metadata: { total_incident: 52 } },
      { id: 15, provinsi: "Maluku", jumlah_kejadian: 33, metadata: { total_incident: 33 } },
      { id: 16, provinsi: "Riau", jumlah_kejadian: 71, metadata: { total_incident: 71 } },
      { id: 17, provinsi: "Kepulauan Riau", jumlah_kejadian: 15, metadata: { total_incident: 15 } },
      { id: 18, provinsi: "Jambi", jumlah_kejadian: 48, metadata: { total_incident: 48 } },
      { id: 19, provinsi: "Sulawesi Tengah", jumlah_kejadian: 39, metadata: { total_incident: 39 } },
      { id: 20, provinsi: "Sulawesi Utara", jumlah_kejadian: 31, metadata: { total_incident: 31 } },
      { id: 21, provinsi: "Sumatera Barat", jumlah_kejadian: 63, metadata: { total_incident: 63 } },
      { id: 22, provinsi: "Sumatera Utara", jumlah_kejadian: 85, metadata: { total_incident: 85 } },
      { id: 23, provinsi: "Bangka Belitung", jumlah_kejadian: 27, metadata: { total_incident: 27 } },
      { id: 24, provinsi: "Bengkulu", jumlah_kejadian: 29, metadata: { total_incident: 29 } },
      { id: 25, provinsi: "Sumatera Selatan", jumlah_kejadian: 58, metadata: { total_incident: 58 } },
      { id: 26, provinsi: "Lampung", jumlah_kejadian: 42, metadata: { total_incident: 42 } },
      { id: 30, provinsi: "Kalimantan Barat", jumlah_kejadian: 46, metadata: { total_incident: 46 } },
      { id: 31, provinsi: "Kalimantan Tengah", jumlah_kejadian: 35, metadata: { total_incident: 35 } },
      { id: 32, provinsi: "Kalimantan Selatan", jumlah_kejadian: 53, metadata: { total_incident: 53 } },
      { id: 33, provinsi: "Kalimantan Timur", jumlah_kejadian: 38, metadata: { total_incident: 38 } },
      { id: 34, provinsi: "Kalimantan Utara", jumlah_kejadian: 22, metadata: { total_incident: 22 } },
      { id: 35, provinsi: "Sulawesi Barat", jumlah_kejadian: 25, metadata: { total_incident: 25 } },
      { id: 36, provinsi: "DKI Jakarta", jumlah_kejadian: 76, metadata: { total_incident: 76 } },
    ],
    [],
  );

  const staticRanks = staticDensities
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }))
    .sort((a, b) => b.jumlah_kejadian - a.jumlah_kejadian);

  // Simulasi loading states
  const isGetDesityLoading = false;
  const isGetRankLoading = false;
  const isGetPointsLoading = false;

  // Data static untuk points (markers)
  const staticPoints = [
    {
      id: 1,
      points: [
        [106.845599, -6.208763], // Jakarta
        [107.608238, -6.914744], // Bandung
        [110.364917, -7.797068], // Yogyakarta
        [112.738144, -7.250445], // Surabaya
      ],
    },
  ];

  const densities = staticDensities;
  const ranks = staticRanks;
  const points = staticPoints;

  const loadKabkotData = useCallback(async () => {
    if (!selectedProvinceForZoom) return;

    try {
      // Ambil province data berdasarkan nama provinsi dari static data
      const provinceData = staticDensities.find(
        (data) => data.provinsi === selectedProvinceForZoom.properties.provinsi,
      );

      if (provinceData) {
        const { findKabkotGeom } = await import("@/utils/services/issue");
        const geomData = await findKabkotGeom(provinceData.id);
        setKabkotData(geomData);
      }
    } catch (error) {
      console.error("Error loading kabkot data:", error);
      setKabkotData([]);
    }
  }, [selectedProvinceForZoom, staticDensities]);

  useEffect(() => {
    if (selectedProvinceForZoom) {
      loadKabkotData();
    } else {
      setKabkotData([]);
    }
  }, [selectedProvinceForZoom, loadKabkotData]);

  // Data static untuk menggantikan API yang tidak aktif

  useFindKabkotGeom(selectedProvince?.id, {
    enabled: !!selectedProvince?.id && selectedProvince?.id !== 0,
    onSuccess: (data) => {
      setKabkotGeom(data);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const GeoJSONEL = useRef(null);

  const highestValue = useMemo(() => {
    if (!isEmpty(densities)) {
      if (selected.id == 3) {
        const max = maxBy(densities, (data) => data.jumlah_kejadian);
        return max.jumlah_kejadian;
      }
      const max = maxBy(densities, (data) => data.metadata.total_incident);
      return max.metadata.total_incident;
    }
    return 0;
  }, [densities, selected.id]);

  const style = (feat) => {
    const featId = feat.properties.id;
    const density = densities.find((data) => data.id === featId);
    const incident = selected.id == 3 ? density?.jumlah_kejadian : density?.metadata?.total_incident;

    // Array warna yang beragam untuk setiap provinsi
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FECA57",
      "#FF9FF3",
      "#54A0FF",
      "#5F27CD",
      "#00D2D3",
      "#FF9F43",
      "#10AC84",
      "#EE5A24",
      "#0984E3",
      "#6C5CE7",
      "#A29BFE",
      "#FD79A8",
      "#E17055",
      "#81ECEC",
      "#74B9FF",
      "#A29BFE",
      "#FDCB6E",
      "#E84393",
      "#00B894",
      "#00CEC9",
      "#6C5CE7",
      "#FD79A8",
      "#FDCB6E",
      "#E17055",
      "#00B894",
      "#81ECEC",
      "#74B9FF",
      "#A29BFE",
      "#FD79A8",
      "#FDCB6E",
      "#E84393",
    ];

    // Gunakan featId untuk menentukan warna yang konsisten
    const colorIndex = (featId - 1) % colors.length;
    const baseColor = colors[colorIndex];

    // Variasi opacity berdasarkan jumlah kejadian
    const opacity = incident ? Math.min(0.4 + (incident / highestValue) * 0.4, 0.8) : 0.6;

    return {
      weight: 2,
      color: "#ffffff",
      dashArray: "3",
      fillOpacity: opacity,
      fillColor: baseColor,
      stroke: true,
    };
  };

  const styleKabkot = (feat) => {
    const { ID_2, NAME_2 } = feat.properties;

    // Array warna konsisten untuk kabupaten/kota
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FECA57",
      "#FF9FF3",
      "#54A0FF",
      "#5F27CD",
      "#00D2D3",
      "#FF9F43",
      "#10AC84",
      "#EE5A24",
      "#0984E3",
      "#6C5CE7",
      "#A29BFE",
    ];

    // Gunakan ID_2 atau hash dari NAME_2 untuk konsistensi warna
    const colorIndex = ID_2 ? (ID_2 - 1) % colors.length : Math.abs(NAME_2.charCodeAt(0)) % colors.length;
    const baseColor = colors[colorIndex];
    const opacity = 0.6; // Opacity tetap konsisten

    return {
      weight: 2,
      color: "#ffffff",
      dashArray: "3",
      fillOpacity: opacity,
      fillColor: baseColor,
    };
  };

  const onEachFeature = (feature, leafletLayer, map) => {
    // Set map instance untuk zoom function
    if (!mapInstance) {
      setMapInstance(map);
    }

    leafletLayer.on({
      // Disable click functionality untuk layer provinsi
      // click: () => {
      //   const popupOptions = {
      //     className: "popup-classname",
      //   };

      //   // Set provinsi yang dipilih untuk zoom dan tampilkan kabupaten
      //   setSelectedProvinceForZoom(feature);

      //   // Zoom ke provinsi yang diklik
      //   if (map) {
      //     const bounds = leafletLayer.getBounds();
      //     map.fitBounds(bounds, { padding: [20, 20] });
      //   }

      //   leafletLayer
      //     .bindPopup(renderToString(<MonitoringPopup province={provinsi} data={provinceData} />), popupOptions)
      //     .openPopup();
      // },
      mouseover: (e) => {
        // Highlight polygon saat hover
        const layer = e.target;
        layer.setStyle({
          weight: 4,
          color: "#333",
          dashArray: "",
          fillOpacity: 0.9,
        });
      },
      mouseout: (e) => {
        // Reset style saat mouse keluar
        const layer = e.target;
        const featId = feature.properties.id;
        const density = densities.find((data) => data.id === featId);
        const incident = selected.id == 3 ? density?.jumlah_kejadian : density?.metadata?.total_incident;

        // Array warna yang sama seperti di fungsi style
        const colors = [
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FECA57",
          "#FF9FF3",
          "#54A0FF",
          "#5F27CD",
          "#00D2D3",
          "#FF9F43",
          "#10AC84",
          "#EE5A24",
          "#0984E3",
          "#6C5CE7",
          "#A29BFE",
          "#FD79A8",
          "#E17055",
          "#81ECEC",
          "#74B9FF",
          "#A29BFE",
          "#FDCB6E",
          "#E84393",
          "#00B894",
          "#00CEC9",
          "#6C5CE7",
          "#FD79A8",
          "#FDCB6E",
          "#E17055",
          "#00B894",
          "#81ECEC",
          "#74B9FF",
          "#A29BFE",
          "#FD79A8",
          "#FDCB6E",
          "#E84393",
        ];

        const colorIndex = (featId - 1) % colors.length;
        const baseColor = colors[colorIndex];
        const opacity = incident ? Math.min(0.4 + (incident / highestValue) * 0.4, 0.8) : 0.4;

        layer.setStyle({
          weight: 2,
          color: "#ffffff",
          dashArray: "3",
          fillOpacity: opacity,
          fillColor: baseColor,
        });
      },
    });
  };

  return (
    <DashboardLayout
      topBarConfig={{
        isShowSearchRegion: true,
        onClickAnalysis: () => window.open("/analysis", "_self"),
        title: "Dashboard",
      }}
      title={"Dashboard · Chakra"}
      profile={profile}
    >
      {isMounted && (
        <div className="map">
          <Map className={styles.homeMap} center={cordinate} cordinate={cordinate} zoom={5.4}>
            {({
              TileLayer,
              GeoJSON,
              JSXMarker,
              useMap,
              centroid,
              polygon,
              booleanPointInPolygon,
              point,
              multiPolygon,
              Marker,
              L,
            }) => {
              return (
                <>
                  <TileLayer
                    className="map"
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
                  />

                  {!isGetDesityLoading &&
                    (!selectedProvince || selectedProvince?.id === 0) &&
                    !selectedProvinceForZoom && (
                      <GeoJSON
                        ref={GeoJSONEL}
                        attribution="&copy; credits due..."
                        data={geojson}
                        style={style}
                        onEachFeature={onEachFeature}
                      />
                    )}

                  {/* Layer kabupaten/kota untuk provinsi yang dipilih dari dropdown */}
                  {/* {selectedProvince && selectedProvince.id !== 0 && kabkotGeom && (
                    <GeoJSON
                      attribution="&copy; credits due..."
                      data={kabkotGeom[0].geojson}
                      style={styleKabkot}
                      onEachFeature={(feature, leafletLayer, map) => {
                        // Set map instance untuk zoom function
                        if (!mapInstance) {
                          setMapInstance(map);
                        }

                        const { NAME_2 } = feature.properties;
                        leafletLayer.on({
                          click: () => {
                            const popupOptions = {
                              className: "popup-classname",
                            };
                            leafletLayer
                              .bindPopup(`<div><h3>${NAME_2}</h3><p>Kabupaten/Kota</p></div>`, popupOptions)
                              .openPopup();
                          },
                        });
                      }}
                    />
                  )} */}

                  {selectedProvince && kabkotGeom && (
                    <>
                      <GeoJSON
                        // ref={GeoJSONEL}
                        attribution="&copy; credits due..."
                        data={kabkotGeom[0].geojson}
                        style={styleKabkot}
                        onEachFeature={(feature, leafletLayer, map) => {
                          // Set map instance untuk zoom function
                          if (!mapInstance) {
                            setMapInstance(map);
                          }

                          const { NAME_2 } = feature.properties;
                          leafletLayer.on({
                            click: () => {
                              const popupOptions = {
                                className: "popup-classname",
                              };

                              // Generate data untuk kabupaten/kota (simulasi)
                              const kabkotData = {
                                rank: Math.floor(Math.random() * 100) + 1,
                                jumlah_kejadian: Math.floor(Math.random() * 50) + 1,
                              };

                              leafletLayer
                                .bindPopup(
                                  renderToString(<MonitoringPopup province={NAME_2} data={kabkotData} />),
                                  popupOptions,
                                )
                                .openPopup();
                            },
                            // Disable hover effects untuk menjaga konsistensi warna
                            // mouseover: () => {},
                            // mouseout: () => {},
                          });
                        }}
                      />
                      <ZoomKabkot kabkotGeom={kabkotGeom} useMap={useMap} centroid={centroid} polygon={polygon} />
                    </>
                  )}

                  {/* {(!selectedProvince || selectedProvince?.id === 0) &&
                    selectedLayer.length > 0 &&
                    !isGetPointsLoading &&
                    points.map((eachPoint, i) =>
                      eachPoint.points.map((data, i2) => {
                        const tempData = cloneDeep(data);

                        return (
                          <Marker
                            key={`${i}-${i2}`}
                            position={reverse(tempData)}
                            icon={
                              new L.Icon({
                                iconUrl: `/images/map/markers/${selected.value}-${eachPoint.id}.${
                                  selected.value == "bencana" ? "svg" : "png"
                                }`,
                                iconSize: [30, 30],
                                iconAnchor: [30 / 2, 30 / 2],
                              })
                            }
                          />
                        );
                      }),
                    )}

                  {selectedProvince &&
                    selectedProvince.id !== 0 &&
                    densities &&
                    kabkotGeom &&
                    selectedLayer.length > 0 &&
                    !isGetPointsLoading &&
                    points.map((eachPoint, i) =>
                      eachPoint.points.map((data, i2) => {
                        const pol = multiPolygon(
                          kabkotGeom[0].geojson.features.map((data) => data.geometry.coordinates),
                        );

                        const isInsidePol = booleanPointInPolygon(data, pol);
                        return (
                          isInsidePol && (
                            <JSXMarker
                              key={`${i}-${i2}`}
                              position={[data[1] + 0.0001, data[0]]}
                              iconOptions={{
                                className: "jsx-marker",
                              }}
                            >
                              <MarkerTriangle fill={markerColors[parseInt(eachPoint.id)]}>
                                <AiFillAccountBook className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white" />
                              </MarkerTriangle>
                            </JSXMarker>
                          )
                        );
                      }),
                    )} */}
                </>
              );
            }}
          </Map>
        </div>
      )}

      <LayerFilter setIsShowGeoJSON={setIsShowGeoJSON} setKabkotGeom={setKabkotGeom} />
      {isShowGeoJSON && (
        <LayerData
          ranks={ranks}
          isRankLoading={isGetRankLoading}
          segmented={segmentedValue(highestValue)}
          issueId={selected.id}
        />
      )}
    </DashboardLayout>
  );
};

export default PatroliPage;
