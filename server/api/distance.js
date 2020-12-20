const google = require("./google");

const defaultLocation = {
  lat: parseFloat(process.env.DEFAULT_LAT),
  lng: parseFloat(process.env.DEFAULT_LNG),
};

const getQueryFromCoordinate = (coordinate) => {
  return coordinate.lat + "," + coordinate.lng;
};

const findDistance = async (origin, destination) => {
  const origins = getQueryFromCoordinate(origin || defaultLocation);
  const destinations = getQueryFromCoordinate(destination);

  const { data } = await google.get("distancematrix/json", {
    params: {
      origins,
      destinations,
      units: "imperial",
    },
  });
  return data;
};

module.exports = { defaultLocation, findDistance };
