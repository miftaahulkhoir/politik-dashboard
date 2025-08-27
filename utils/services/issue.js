import { useQuery } from "@tanstack/react-query";
import mockClient from "../helpers/mock-client";
import axios from "axios";

const findAllIssue = async () => {
  const { data } = await axios.get("/api/issues");

  return data.data || [];
};

const getAllProvinces = async () => {
  // Static data from GeoJSON - semua provinsi yang ada di Indonesia
  const provincesList = [
    { id: 0, name: "Semua" },
    { id: 1, name: "Aceh" },
    { id: 2, name: "Sumatera Utara" },
    { id: 3, name: "Sumatera Barat" },
    { id: 4, name: "Riau" },
    { id: 5, name: "Jambi" },
    { id: 6, name: "Sumatera Selatan" },
    { id: 7, name: "Bengkulu" },
    { id: 8, name: "Lampung" },
    { id: 9, name: "Kepulauan Bangka Belitung" },
    { id: 10, name: "Kepulauan Riau" },
    { id: 11, name: "DKI Jakarta" },
    { id: 12, name: "Jawa Barat" },
    { id: 13, name: "Jawa Tengah" },
    { id: 14, name: "DI Yogyakarta" },
    { id: 15, name: "Jawa Timur" },
    { id: 16, name: "Banten" },
    { id: 17, name: "Bali" },
    { id: 18, name: "Nusa Tenggara Barat" },
    { id: 19, name: "Nusa Tenggara Timur" },
    { id: 20, name: "Kalimantan Barat" },
    { id: 21, name: "Kalimantan Tengah" },
    { id: 22, name: "Kalimantan Selatan" },
    { id: 23, name: "Kalimantan Timur" },
    { id: 24, name: "Kalimantan Utara" },
    { id: 25, name: "Sulawesi Utara" },
    { id: 26, name: "Sulawesi Tengah" },
    { id: 27, name: "Sulawesi Selatan" },
    { id: 28, name: "Sulawesi Tenggara" },
    { id: 29, name: "Gorontalo" },
    { id: 30, name: "Sulawesi Barat" },
    { id: 31, name: "Maluku" },
    { id: 32, name: "Maluku Utara" },
    { id: 33, name: "Papua Barat" },
    { id: 34, name: "Papua" },
  ];

  return provincesList;
};

const findKabkot = async (provinceId) => {
  // Data kabupaten/kota berdasarkan provinsi (contoh untuk beberapa provinsi)
  const kabkotData = {
    // Jawa Barat
    12: [
      { id: 1, name: "Kabupaten Bandung" },
      { id: 2, name: "Kabupaten Bandung Barat" },
      { id: 3, name: "Kabupaten Bekasi" },
      { id: 4, name: "Kabupaten Bogor" },
      { id: 5, name: "Kabupaten Ciamis" },
      { id: 6, name: "Kabupaten Cianjur" },
      { id: 7, name: "Kabupaten Cirebon" },
      { id: 8, name: "Kabupaten Garut" },
      { id: 9, name: "Kabupaten Indramayu" },
      { id: 10, name: "Kabupaten Karawang" },
      { id: 11, name: "Kabupaten Kuningan" },
      { id: 12, name: "Kabupaten Majalengka" },
      { id: 13, name: "Kabupaten Pangandaran" },
      { id: 14, name: "Kabupaten Purwakarta" },
      { id: 15, name: "Kabupaten Subang" },
      { id: 16, name: "Kabupaten Sukabumi" },
      { id: 17, name: "Kabupaten Sumedang" },
      { id: 18, name: "Kabupaten Tasikmalaya" },
      { id: 19, name: "Kota Bandung" },
      { id: 20, name: "Kota Banjar" },
      { id: 21, name: "Kota Bekasi" },
      { id: 22, name: "Kota Bogor" },
      { id: 23, name: "Kota Cimahi" },
      { id: 24, name: "Kota Cirebon" },
      { id: 25, name: "Kota Depok" },
      { id: 26, name: "Kota Sukabumi" },
      { id: 27, name: "Kota Tasikmalaya" },
    ],
    // Jawa Timur
    15: [
      { id: 1, name: "Kabupaten Bangkalan" },
      { id: 2, name: "Kabupaten Banyuwangi" },
      { id: 3, name: "Kabupaten Blitar" },
      { id: 4, name: "Kabupaten Bojonegoro" },
      { id: 5, name: "Kabupaten Bondowoso" },
      { id: 6, name: "Kabupaten Gresik" },
      { id: 7, name: "Kabupaten Jember" },
      { id: 8, name: "Kabupaten Jombang" },
      { id: 9, name: "Kabupaten Kediri" },
      { id: 10, name: "Kabupaten Lamongan" },
      { id: 11, name: "Kabupaten Lumajang" },
      { id: 12, name: "Kabupaten Madiun" },
      { id: 13, name: "Kabupaten Magetan" },
      { id: 14, name: "Kabupaten Malang" },
      { id: 15, name: "Kabupaten Mojokerto" },
      { id: 16, name: "Kabupaten Nganjuk" },
      { id: 17, name: "Kabupaten Ngawi" },
      { id: 18, name: "Kabupaten Pacitan" },
      { id: 19, name: "Kabupaten Pamekasan" },
      { id: 20, name: "Kabupaten Pasuruan" },
      { id: 21, name: "Kabupaten Ponorogo" },
      { id: 22, name: "Kabupaten Probolinggo" },
      { id: 23, name: "Kabupaten Sampang" },
      { id: 24, name: "Kabupaten Sidoarjo" },
      { id: 25, name: "Kabupaten Situbondo" },
      { id: 26, name: "Kabupaten Sumenep" },
      { id: 27, name: "Kabupaten Trenggalek" },
      { id: 28, name: "Kabupaten Tuban" },
      { id: 29, name: "Kabupaten Tulungagung" },
      { id: 30, name: "Kota Batu" },
      { id: 31, name: "Kota Blitar" },
      { id: 32, name: "Kota Kediri" },
      { id: 33, name: "Kota Madiun" },
      { id: 34, name: "Kota Malang" },
      { id: 35, name: "Kota Mojokerto" },
      { id: 36, name: "Kota Pasuruan" },
      { id: 37, name: "Kota Probolinggo" },
      { id: 38, name: "Kota Surabaya" },
    ],
    // Jawa Tengah
    13: [
      { id: 1, name: "Kabupaten Banjarnegara" },
      { id: 2, name: "Kabupaten Banyumas" },
      { id: 3, name: "Kabupaten Batang" },
      { id: 4, name: "Kabupaten Blora" },
      { id: 5, name: "Kabupaten Boyolali" },
      { id: 6, name: "Kabupaten Brebes" },
      { id: 7, name: "Kabupaten Cilacap" },
      { id: 8, name: "Kabupaten Demak" },
      { id: 9, name: "Kabupaten Grobogan" },
      { id: 10, name: "Kabupaten Jepara" },
      { id: 11, name: "Kabupaten Karanganyar" },
      { id: 12, name: "Kabupaten Kebumen" },
      { id: 13, name: "Kabupaten Kendal" },
      { id: 14, name: "Kabupaten Klaten" },
      { id: 15, name: "Kabupaten Kudus" },
      { id: 16, name: "Kabupaten Magelang" },
      { id: 17, name: "Kabupaten Pati" },
      { id: 18, name: "Kabupaten Pekalongan" },
      { id: 19, name: "Kabupaten Pemalang" },
      { id: 20, name: "Kabupaten Purbalingga" },
      { id: 21, name: "Kabupaten Purworejo" },
      { id: 22, name: "Kabupaten Rembang" },
      { id: 23, name: "Kabupaten Semarang" },
      { id: 24, name: "Kabupaten Sragen" },
      { id: 25, name: "Kabupaten Sukoharjo" },
      { id: 26, name: "Kabupaten Tegal" },
      { id: 27, name: "Kabupaten Temanggung" },
      { id: 28, name: "Kabupaten Wonogiri" },
      { id: 29, name: "Kabupaten Wonosobo" },
      { id: 30, name: "Kota Magelang" },
      { id: 31, name: "Kota Pekalongan" },
      { id: 32, name: "Kota Salatiga" },
      { id: 33, name: "Kota Semarang" },
      { id: 34, name: "Kota Surakarta" },
      { id: 35, name: "Kota Tegal" },
    ],
    // DKI Jakarta
    11: [
      { id: 1, name: "Jakarta Pusat" },
      { id: 2, name: "Jakarta Utara" },
      { id: 3, name: "Jakarta Barat" },
      { id: 4, name: "Jakarta Selatan" },
      { id: 5, name: "Jakarta Timur" },
      { id: 6, name: "Kepulauan Seribu" },
    ],
    // Banten
    16: [
      { id: 1, name: "Kabupaten Lebak" },
      { id: 2, name: "Kabupaten Pandeglang" },
      { id: 3, name: "Kabupaten Serang" },
      { id: 4, name: "Kabupaten Tangerang" },
      { id: 5, name: "Kota Cilegon" },
      { id: 6, name: "Kota Serang" },
      { id: 7, name: "Kota Tangerang" },
      { id: 8, name: "Kota Tangerang Selatan" },
    ],
  };

  // Return kabupaten/kota untuk provinsi yang diminta, atau array kosong jika tidak ada
  const kabkotList = kabkotData[provinceId] || [];

  // Tambahkan opsi "Semua" di awal jika ada data kabupaten/kota
  if (kabkotList.length > 0) {
    return [{ id: 0, name: "Semua" }, ...kabkotList];
  }

  return kabkotList;
};

const findAllYearByIssue = async (issueId) => {
  const { data } = await mockClient.get(`/years`, {
    params: {
      id: issueId,
    },
  });

  return data.data[0].years || [];
};

const findSubIssue = async (payload) => {
  const { data } = await axios.get(`/api/sub-issues`, {
    params: {
      issue_id: payload.id,
    },
  });

  return data.data;
};

const findProvinceDensity = async (payload) => {
  const { data } = await mockClient.get(`/issue/density`, {
    params: {
      issue: payload.issue,
      year: payload.year,
    },
  });

  return data.data;
};

const findProvinceDensityRank = async (payload) => {
  const { data } = await mockClient.get(`/issue/rank`, {
    params: {
      issue: payload.issue,
      year: payload.year,
    },
  });

  return data.data;
};

const findLayerPinpoint = async (payload) => {
  const { data } = await mockClient.get(`/points`, {
    params: {
      id: payload.ids,
    },
  });

  return data.data;
};

const findKabkotGeom = async (provinceId) => {
  try {
    // Load GeoJSON data from public folder
    const response = await fetch("/geojson/kabkot-geojson.json");
    const kabkotGeoJSON = await response.json();

    // Mapping provinsi ID ke nama provinsi (belum sesuai dengan NAME_1 di kabkot-geojson.json)
    const provinceMapping = {
      1: "Aceh",
      2: "Sumatera Utara",
      3: "Sumatera Barat",
      4: "Riau",
      5: "Jambi",
      6: "Sumatera Selatan",
      7: "Bengkulu",
      8: "Lampung",
      9: "Bangka-Belitung", // Nama asli yang tidak sesuai dengan GeoJSON
      10: "Kepulauan Riau",
      11: "Jakarta Raya", // Nama asli yang tidak sesuai dengan GeoJSON
      12: "Jawa Barat",
      13: "Jawa Tengah",
      14: "Yogyakarta", // Nama asli yang tidak sesuai dengan GeoJSON
      15: "Jawa Timur",
      16: "Banten",
      17: "Bali",
      18: "Nusa Tenggara Barat",
      19: "Nusa Tenggara Timur",
      20: "Kalimantan Barat",
      21: "Kalimantan Tengah",
      22: "Kalimantan Selatan",
      23: "Kalimantan Timur",
      24: "Kalimantan Utara",
      25: "Sulawesi Utara",
      26: "Sulawesi Tengah",
      27: "Sulawesi Selatan",
      28: "Sulawesi Tenggara",
      29: "Gorontalo",
      30: "Sulawesi Barat",
      31: "Maluku",
      32: "Maluku Utara",
      33: "Irian Jaya Barat", // Nama asli yang tidak sesuai dengan GeoJSON
      34: "Papua",
    };

    const provinceName = provinceMapping[provinceId];

    if (!provinceName) {
      return [];
    }

    // Filter features berdasarkan nama provinsi
    const filteredFeatures = kabkotGeoJSON.filter(
      (feature) => feature.properties && feature.properties.NAME_1 === provinceName,
    );

    // Format sesuai dengan ekspektasi aplikasi
    return [
      {
        geojson: {
          type: "FeatureCollection",
          features: filteredFeatures,
        },
      },
    ];
  } catch (error) {
    console.error("Error loading kabkot geometry:", error);
    return [];
  }
};

export const importIssues = async (payload) => {
  const { data } = await axios.post("/api/issues/import", payload);
  return data.data;
};

export const useFindAllIssues = (extraParams) => useQuery(["issues"], findAllIssue, { ...extraParams });

export const useFindAllYearsByIssue = (issueId, extraParams) =>
  useQuery(["all-year-issue", issueId], () => findAllYearByIssue(issueId), { ...extraParams });

export const useFindAllSubIssues = (payload, extraParams) =>
  useQuery(["all-sub-issue", payload], () => findSubIssue(payload), { ...extraParams });

export const useFindProvinceDensity = (payload, extraparams) =>
  useQuery(["all-province-density", payload], () => findProvinceDensity(payload), { ...extraparams });

export const useFindProvinceDensityRank = (payload, extraparams) =>
  useQuery(["all-province-rank", payload], () => findProvinceDensityRank(payload), { ...extraparams });

export const useFindLayerPinPoint = (payload, extraparams) =>
  useQuery(["all-pinpoint", payload], () => findLayerPinpoint(payload), { ...extraparams });

export const useGetAllProvinces = (extraparams) =>
  useQuery(["all-provinces"], () => getAllProvinces(), { ...extraparams });

export const useFindKabkot = (id, extraparams) =>
  useQuery(["all-kabkot", id], () => findKabkot(id), { ...extraparams });

export const useFindKabkotGeom = (id, extraparams) =>
  useQuery(["all-kabkot-geom", id], () => findKabkotGeom(id), { ...extraparams });
