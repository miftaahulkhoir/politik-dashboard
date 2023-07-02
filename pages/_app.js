import axios from "axios";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

// import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/ant-override.css";
import "../styles/globals.css";
import { redirectUser } from "../utils/services/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import getProfileServerSide from "@/utils/services/get-profile-serverside";
import { Spin } from "antd";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    router.events.on("routeChangeStart", () => setIsLoading(true));
    router.events.on("routeChangeComplete", () => setIsLoading(false));
    router.events.on("routeChangeError", () => setIsLoading(false));
    return () => {
      router.events.off("routeChangeStart", () => setIsLoading(true));
      router.events.off("routeChangeComplete", () => setIsLoading(false));
      router.events.off("routeChangeError", () => setIsLoading(false));
    };
  }, [router]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#4F5FC7",
        },
      }}
    >
      <Spin spinning={isLoading} size="large">
        {(router.pathname !== "/login" &&
          router.pathname !== "/register" &&
          router.pathname !== "/" &&
          pageProps.profile?.occupation?.level === 1) ||
        (router.pathname !== "/login" &&
          router.pathname !== "/register" &&
          pageProps.profile?.occupation?.level > 1) ? (
          // <DashboardLayout {...pageProps}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        ) : (
          // </DashboardLayout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        )}
      </Spin>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  let baseURL = "";
  if (`https://${req?.headers?.host}/` === process.env.APP_BASEURL_DEFAULT) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (`https://${req?.headers?.host}/` === process.env.APP_BASEURL_PATRON) {
    baseURL = process.env.APP_BASEURL_PATRON;
  } else {
    baseURL = process.env.APP_BASEURL_LOCAL;
  }

  pageProps.baseURL = baseURL;

  const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/surveys" ||
    ctx.pathname === "/survey-analysis" ||
    ctx.pathname === "/social-media-analysis" ||
    ctx.pathname === "/sentiment" ||
    ctx.pathname === "/sentiment-analysis" ||
    ctx.pathname === "/panel-ads" ||
    ctx.pathname === "/whatsapp-blast" ||
    ctx.pathname === "/users" ||
    ctx.pathname === "/events" ||
    ctx.pathname === "/reports" ||
    ctx.pathname === "/logistics" ||
    ctx.pathname === "/pemetaan" ||
    ctx.pathname === "/analysis" ||
    ctx.pathname === "/management-access" ||
    ctx.pathname === "/management-data" ||
    ctx.pathname === "/ongoing" ||
    ctx.pathname === "/survey" ||
    ctx.pathname === "/survey/survey-analysis";

  if (!token) {
    destroyCookie(ctx, "token");
    protectedRoutes && redirectUser(ctx, "/login");
  } else {
    const { profile } = await getProfileServerSide(ctx);
    pageProps.profile = profile;

    if (Component.getServerSideProps) {
      pageProps = await Component.getServerSideProps(ctx);
    }
    // !protectedRoutes && redirectUser(ctx, "/");
  }
  return { pageProps };
};

export default MyApp;
