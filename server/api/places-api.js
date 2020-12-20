const axios = require("axios");

const places = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place",
  params: {
    key: process.env.GOOGLE_API_SECRET,
  },
});

const searchPlace = async (searchText) => {
  const { data } = await places.get("/findplacefromtext/json", {
    params: {
      input: searchText,
      inputtype: "textquery",
      fields: "place_id,name,rating,geometry",
    },
  });
  console.log(data);
};

module.exports = searchPlace;
