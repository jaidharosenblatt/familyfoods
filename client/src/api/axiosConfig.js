import axios from "axios";

const client = axios.create({
  baseURL: "http://eat-together-us.herokuapp.com",
  // baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: { crossDomain: true, "Content-Type": "application/json" },
});

/* RESPONSE INTERCEPTORS */
const errorHandler = (error) => {
  console.log(error);
  if (error?.response?.data?.error) {
    return Promise.reject(error.response.data.error);
  }
  return Promise.reject("Server error");
};

const successHandler = (response) => {
  return response;
};

client.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default client;
