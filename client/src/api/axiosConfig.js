import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "Access-Control-Allow-Origin": "*" },
});

/* RESPONSE INTERCEPTORS */
const errorHandler = (error) => {
  console.log(error);

  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  return response;
};

client.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default client;
