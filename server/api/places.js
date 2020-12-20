const google = require("./google");

const searchPlace = async (searchText) => {
  const { data } = await google.get("place/findplacefromtext/json", {
    params: {
      input: searchText,
      inputtype: "textquery",
      fields: "place_id,name,rating,geometry",
    },
  });
  return data;
};

module.exports = searchPlace;
