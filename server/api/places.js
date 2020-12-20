const google = require("./google");

const searchPlace = async (searchText) => {
  const fields = "place_id,price_level,name,rating,geometry";

  const { data } = await google.get("place/findplacefromtext/json", {
    params: {
      input: searchText,
      inputtype: "textquery",
      fields,
    },
  });
  return data;
};

module.exports = searchPlace;
