import axios from "axios";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React from "react";

// import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/ant-override.css";
import "../styles/globals.css";
import { redirectUser } from "../utils/services/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import getProfileServerSide from "@/utils/services/get-profile-serverside";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#4F5FC7",
        },
      }}
    >
      {(router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/" &&
        pageProps.profile?.occupation?.level === 1) ||
      (router.pathname !== "/login" && router.pathname !== "/register" && pageProps.profile?.occupation?.level > 1) ? (
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
    ctx.pathname === "/ongoing" ||
    ctx.pathname === "/survey";

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
