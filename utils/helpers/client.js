import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.APP_BASEURL}api`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default client;
