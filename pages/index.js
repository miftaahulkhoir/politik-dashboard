import { ACCESS_LIST } from "@/constants/access-list";
import PatroliPage from "@/containers/patroli";
import MonitoringProvider from "@/providers/issue-providers";

import { handleAccess } from "@/utils/helpers/handle-access-serverside";

import axios from "axios";
// import dynamic from "next/dynamic";
import { parseCookies } from "nookies";

export default function Index(props) {
  return (
    <MonitoringProvider>
      <PatroliPage {...props} />
    </MonitoringProvider>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  const baseURL = "";
  // if (`https://${req.headers.host}/` === process.env.APP_BASEURL_DEFAULT) {
  //   baseURL = process.env.APP_BASEURL_DEFAULT;
  // } else if (`https://${req.headers.host}/` === process.env.APP_BASEURL_PATRON) {
  //   baseURL = process.env.APP_BASEURL_PATRON;
  // } else {
  //   baseURL = process.env.APP_BASEURL_LOCAL;
  // }

  // await handleAccess(ctx, ACCESS_LIST.MONITORING);

  const kecamatan = [];
  const koordinator = [];
  const relawan = [];
  const pemilih = [];
  const daftarhitam = [];
  const users = [];
  // await axios
  //   .get(`${baseURL}api/users`, {
  //     withCredentials: true,
  //     headers: { Cookie: `token=${token}` },
  //   })
  //   .then((res) => {
  //     users = res.data.data;
  //     koordinator = res.data.data.filter((x) => x.occupation?.level === 2);
  //     relawan = res.data.data.filter((x) => x.occupation?.level === 3);
  //     pemilih = res.data.data.filter((x) => x.occupation?.level === 4);
  //     daftarhitam = res.data.data.filter((x) => x.occupation?.level === 5);
  //   })
  //   .catch((err) => {});
  // await axios
  //   .get(`${baseURL}api/distric`, {
  //     withCredentials: true,
  //     headers: { Cookie: `token=${token}` },
  //   })
  //   .then((res) => {
  //     kecamatan = res.data.data;
  //   })
  //   .catch((err) => {});
  return {
    props: { users, koordinator, relawan, pemilih, daftarhitam, kecamatan },
  };
}
