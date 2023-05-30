import axios from "axios";

const mockClient = axios.create({
  baseURL: `https://mock-api.patronsmonitoring.id`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default mockClient;
