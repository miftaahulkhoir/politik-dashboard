import axios from "axios";
import Router from "next/router";
import { destroyCookie } from "nookies";

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(`${process.env.APP_BASEURL}login`, {
      username: username,
      password: password,
    });
    if (res.data.status === true) {
      return true;
    }
  } catch (error) {
    return false;
  }
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
    destroyCookie(null, "token");
    Router.push("/login");
  } catch (error) {}
  await axios.post(`${process.env.APP_BASEURL}logout`).then((res) => {
    if (res.data.status === true) {
      Router.push("/login");
    }
  });
};
