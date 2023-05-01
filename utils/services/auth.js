import axios from "axios";
import Router from "next/router";
import { destroyCookie } from "nookies";

export const loginUser = async (email, password, remember) => {
  const res = await axios.post(`/api/login`, {
    email: email,
    password: password,
  });
  console.clear();
  return res;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(`/api/forget-password`, {
    email: email,
  });
  console.clear();
  return res;
};

export const resetPassword = async (params, password) => {
  const res = await axios.post(
    `/api/reset-password`,
    {
      password,
      password_confirm: password,
    },
    {
      params,
    },
  );
  console.clear();
  return res;
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`/api/logout`).then((res) => {
      if (res.data.status) {
        Router.push("/login");
      }
    });
    destroyCookie(null, "token");
    Router.push("/login");
  } catch (error) {
    console.error(error);
  }
  console.clear();
};
