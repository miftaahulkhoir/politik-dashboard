import { notification } from "antd";
import axios from "axios";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useState } from "react";

export default function Blast(pageProps) {
  const { koordinator, relawan, pemilih, profile } = pageProps;
  const [kirimKoordinator, setKirimKoordinator] = useState(false);
  const [kirimRelawan, setKirimRelawan] = useState(false);
  const [kirimPemilih, setKirimPemilih] = useState(false);
  const [customNumber, setCustomNumber] = useState(false);
  const [apiNotification, contextHolderNotification] = notification.useNotification();
  const [newNumber, setNewNumber] = useState("");
  const [pesan, setPesan] = useState("");

  const handleBlastPesan = () => {
    // let phone =
    //   '087720505350, 082298778245, 081413016714, 082227711152, 085260402035, 081398577794';

    let noPhone = "";
    if (kirimKoordinator === true) {
      koordinator.forEach((element) => {
        noPhone += `${element.phone},`;
      });
    }
    if (kirimRelawan === true) {
      relawan.forEach((element) => {
        noPhone += `${element.phone},`;
      });
    }
    if (kirimPemilih === true) {
      pemilih.forEach((element) => {
        noPhone += `${element.phone},`;
      });
    }
    axios
      .post(`${process.env.APP_BASEURL}api/wa/send`, {
        secretkey: "KyaRxzcVpqwe",
        phone: customNumber === true ? newNumber : noPhone,
        message: pesan,
      })
      .then((res) => {
        apiNotification.success({
          message: "Berhasil",
          description: "Pesan Terkirim",
        });
      })
      .catch((err) => {
        apiNotification.error({
          message: "Gagal",
          description: "Tidak dapat mengirim pesan",
        });
      });
  };

  return (
    <>
      <Head>
        <title>WhatsApp Blast · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>WhatsApp Blast</h1>
      </div>
      {contextHolderNotification}
      <div className="col-12 mb-24">
        <div className="card">
          <div className="card-body">
            <ul className="px-0">
              <h5>Pilih Penerima Pesan</h5>
              <hr />
              {profile.occupation?.level < 2 && (
                <li>
                  <input type="checkbox" defaultChecked={kirimKoordinator} onClick={() => setKirimKoordinator(!kirimKoordinator)} /> Semua Koordinator
                </li>
              )}
              {profile.occupation?.level < 3 && (
                <li>
                  <input type="checkbox" defaultChecked={kirimRelawan} onClick={() => setKirimRelawan(!kirimRelawan)} /> Semua Relawan
                </li>
              )}
              {profile.occupation?.level < 3 && (
                <li>
                  <input type="checkbox" defaultChecked={kirimPemilih} onClick={() => setKirimPemilih(!kirimPemilih)} /> Semua Pemilih
                </li>
              )}
              <li>
                <input type="checkbox" defaultChecked={customNumber} onClick={() => setCustomNumber(!customNumber)} /> Custom Number
              </li>
            </ul>
            <div className="form-group">
              <label>
                <h5>Custom Number</h5>
              </label>
              <input className="form-control" onChange={(e) => setNewNumber(e.target.value)} disabled={customNumber === false}></input>
            </div>
            <div className="form-group">
              <label>
                <h5>Pesan</h5>
              </label>
              <textarea
                className="form-control"
                rows={10}
                onChange={(e) => setPesan(e.target.value)}
                disabled={kirimKoordinator === false && kirimRelawan === false && kirimPemilih === false && customNumber === false}
              ></textarea>
            </div>
            <div className="form-group d-flex justify-content-end">
              <button className="btn btn-sm btn-primary" disabled={pesan === ""} onClick={() => handleBlastPesan()}>
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  let koordinator = [];
  let relawan = [];
  let pemilih = [];
  let users = [];
  await axios
    .get(`${process.env.APP_BASEURL}api/users`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      users = res.data.data;
      koordinator = res.data.data.filter((x) => x.occupation?.level === 2);
      relawan = res.data.data.filter((x) => x.occupation?.level === 3);
      pemilih = res.data.data.filter((x) => x.occupation?.level === 4);
    })
    .catch((err) => {});
  return {
    props: { users, koordinator, relawan, pemilih },
  };
}
