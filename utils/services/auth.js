import axios from "axios";
import Router from "next/router";
import { destroyCookie } from "nookies";

export const loginUser = async (email, password, remember) => {
  const res = await axios.post(`/api/login`, {
    email: email,
    password: password,
  });

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
};
