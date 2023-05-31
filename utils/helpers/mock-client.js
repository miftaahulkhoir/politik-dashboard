import axios from "axios";

const mockClient = axios.create({
  baseURL: `https://mock-api.cakradata.com`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default mockClient;
