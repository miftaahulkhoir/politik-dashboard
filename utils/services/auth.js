import axios from "axios";
import Router from "next/router";

export const loginUser = async (email, password, remember) => {
  const res = await axios.post(`/api/login`, {
    email: email,
    password: password,
  });
  return res;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(`/api/forget-password`, {
    email: email,
  });
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
    // Remove token from localStorage
    localStorage.removeItem("auth_token");

    // Redirect to login page
    window.location.replace("/login");
  } catch (error) {
    console.error("Logout error:", error);
    // Even if there's an error, still try to redirect
    window.location.replace("/login");
  }
};
