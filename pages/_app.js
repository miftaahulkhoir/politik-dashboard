import React from "react";
import { redirectUser } from "../utils/auth";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import "../public/css/vendor/font-awesome.css";
import "../public/css/vendor/themify-icons.css";
import "../public/css/vendor/flag-icon/flag-icon.css";
import "../public/css/vendor/icoicon/icoicon.css";
import "../public/css/vendor/simplebar.css";
import "../public/css/vendor/bootstrap.css";
import "../public/css/style.css";
import DashboardLayout from "../layouts/DashboardLayout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/login" && router.pathname !== "/register" ? (
        <DashboardLayout>
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
  let { token } = parseCookies(ctx);

  const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/surveys" ||
    ctx.pathname === "/users";

  if (!token) {
    destroyCookie(ctx, "token");
    protectedRoutes && redirectUser(ctx, "/login");
  } else {
    // const res = await axios.get(`${process.env.APP_BASEURL}profiles/info`, {
    //   withCredentials: true,
    //   headers: { Cookie: `token=${token}` },
    // });
    // pageProps.user = await res.data.data;
    if (Component.getServerSideProps) {
      pageProps = await Component.getServerSideProps(ctx);
    }
    !protectedRoutes && redirectUser(ctx, "/");
  }
  return { pageProps };
};

export default MyApp;
