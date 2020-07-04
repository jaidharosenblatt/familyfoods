import axios from "axios";
const token = "keyMQdDvOvNG9iTZa";
const client = axios.create({
  baseURL: "https://api.airtable.com/v0/appLbsVUknlYy9WE5/",
  headers: { Authorization: `Bearer ${token}` },
});

export default client;
