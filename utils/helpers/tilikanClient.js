import axios from "axios";

const tilikanClient = axios.create({
  baseURL: `${process.env.API_BASEURL_TILIKAN_V1}`,
  headers: {
    "Content-Type": "application/json",
    Cookie: `token=${process.env.API_SECRET_KEY_TILIKAN}`,
  },
});

export default tilikanClient;
