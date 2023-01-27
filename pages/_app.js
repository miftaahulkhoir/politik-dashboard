import axios from "axios";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import "../public/css/style.css";
import "../public/css/vendor/bootstrap.css";
import "../public/css/vendor/flag-icon/flag-icon.css";
import "../public/css/vendor/font-awesome.css";
import "../public/css/vendor/icoicon/icoicon.css";
import "../public/css/vendor/simplebar.css";
import "../public/css/vendor/themify-icons.css";
import { redirectUser } from "../utils/auth";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {(router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/" &&
        pageProps.profile?.occupation?.level === 1) ||
      (router.pathname !== "/login" && router.pathname !== "/register" && pageProps.profile?.occupation?.level > 1) ? (
        <DashboardLayout {...pageProps}>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  let baseURL = "";
  if (req.headers.host === process.env.APP_BASEURL_DEFAULT.replace('https://',"").replace("http://","").replace("/","")) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (req.headers.host === process.env.APP_BASEURL_PATRON.replace('https://',"").replace("http://","").replace("/","")) {
    baseURL = process.env.APP_BASEURL_PATRON;
  }

  pageProps.baseURL = baseURL;

  const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/surveys" ||
    ctx.pathname === "/survey-analysis" ||
    ctx.pathname === "/sentiment-analysis" ||
    ctx.pathname === "/panel-ads" ||
    ctx.pathname === "/whatsapp-blast" ||
    ctx.pathname === "/users" ||
    ctx.pathname === "/reports" ||
    ctx.pathname === "/pemetaan" ||
    ctx.pathname === "/ongoing";

  if (!token) {
    destroyCookie(ctx, "token");
    protectedRoutes && redirectUser(ctx, "/login");
  } else {
    const res = await axios.get(`${baseURL}api/profile`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    });
    pageProps.profile = await res.data.data;
    if (Component.getServerSideProps) {
      pageProps = await Component.getServerSideProps(ctx);
    }
    !protectedRoutes && redirectUser(ctx, "/");
  }
  return { pageProps };
};

export default MyApp;
