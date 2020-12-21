import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default client;
