const axios = require("axios");

const google = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
  params: {
    key: process.env.GOOGLE_API_SECRET,
  },
});

const successHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  console.log(error);
  return Promise.reject({ ...error });
};

google.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
module.exports = google;
