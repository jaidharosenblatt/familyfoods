import axios from "axios";

const client = axios.create({
  baseURL: "https://eat-together-us.herokuapp.com",
  withCredentials: true,
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
  console.log(response);
  return response;
};

client.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default client;
