import "../public/css/style.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import "../styles/ant-override.css";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { Spin } from "antd";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // Check authentication on client side
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      const isLoginPage = router.pathname === "/login";

      // If user is authenticated and trying to access login page, redirect to homepage
      if (token === "valid_user_logged_in" && isLoginPage) {
        router.push("/");
        return;
      }

      // If user is not authenticated and not on login page, redirect to login
      if (!token && !isLoginPage) {
        router.push("/login");
        return;
      }

      if (token === "valid_user_logged_in") {
        setIsAuthenticated(true);
      }

      setAuthChecked(true);
    };

    checkAuth();
  }, [router]);

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

  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Allow login page without authentication
  if (router.pathname === "/login") {
    return (
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#4F5FC7",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ConfigProvider>
    );
  }

  // Require authentication for all other pages
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    );
  }

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
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Spin>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = {};
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

  if (Component.getServerSideProps) {
    const componentProps = await Component.getServerSideProps(ctx);
    Object.assign(pageProps, componentProps.props || {});
  }

  return { pageProps };
};

export default MyApp;
