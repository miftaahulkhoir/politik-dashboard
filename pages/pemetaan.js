/* eslint-disable no-loss-of-precision */
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

import Card from "../components/elements/card/Card";
import styles from "../components/elements/map/Home.module.css";
const Map = dynamic(() => import("../components/elements/map/Map"), {
  ssr: false,
});

export default function Pemetaan({ users }) {
  const [isMounted, setIsMounted] = useState(false);
  const [markers, setMarkers] = useState([1, 2, 3, 4, 5]);
  const [zoom, setZoom] = useState(5.1);
  const [cordinate, setCordinate] = useState([-2.0459326720699523, 122.07302997496033]);
  const colors = ["#22a7f0", "#2ecc71", "#e74c3c", "#f1c40f", "#2c3e50"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div className="pemetaan">
        <div className="floating-panel">
          <div className="col-12 pb-5 mb-24">
            <h1>Pemetaan</h1>
          </div>
          <div className="col-12 mb-24">
            <Card>
              <div className="d-flex justify-content-between mb-12 mt-8">
                <ul className=" nav ">
                  <li className="nav-item">
                    <a className="nav-link active">Data</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Persebaran</a>
                  </li>
                </ul>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="px-3 py-3">Total koordinator</th>
                    <th className="px-3 py-3">Total relawan</th>
                    <th className="px-3 py-3">Total pemilih</th>
                    <th className="px-3 py-3">Pemilih terjangkau</th>
                    <th className="px-3 py-3">Total kecamatan</th>
                    <th className="px-3 py-3">Daftar hitam</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="px-3 py-3">491 koordinator</th>
                    <th className="px-3 py-3">312 relawan</th>
                    <th className="px-3 py-3">579 pemilih</th>
                    <th className="px-3 py-3">667 terjangkau</th>
                    <th className="px-3 py-3">22 kecamatan</th>
                    <th className="px-3 py-3">2170 daftar hitam</th>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </div>
        {isMounted && (
          <div className="map">
            <Map className={styles.homeMap} center={cordinate} cordinate={cordinate} zoom={zoom} zoomTo={zoom}>
              {({ TileLayer, CircleMarker, Marker, Polygon, Tooltip }) => (
                <>
                  <TileLayer
                    className="map"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm?.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[-2.0459326720699523, 120.07302997496033]}>
                    <Tooltip>419 Koordinator</Tooltip>
                  </Marker>
                  <Marker position={[2.0459326720699523, 100.07302997496033]}>
                    <Tooltip>312 Relawan</Tooltip>
                  </Marker>
                  <Marker position={[-2.0459326720699523, 110.07302997496033]}>
                    <Tooltip>579 Pemilih</Tooltip>
                  </Marker>
                  <Marker position={[-8.2459326720699523, 115.07302997496033]}>
                    <Tooltip>667 Terjangkau</Tooltip>
                  </Marker>
                  <Marker position={[-3.2459326720699523, 130.07302997496033]}>
                    <Tooltip>22 Kecamatan</Tooltip>
                  </Marker>
                  <Marker position={[-3.2459326720699523, 112.07302997496033]}>
                    <Tooltip>2170 Daftar Hitam</Tooltip>
                  </Marker>
                </>
              )}
            </Map>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  let baseURL = "";
  if (`https://${req.headers.host}/` === process.env.APP_BASEURL_DEFAULT) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (`https://${req.headers.host}/` === process.env.APP_BASEURL_PATRON) {
    baseURL = process.env.APP_BASEURL_PATRON;
  }

  return { props: {} };
}
