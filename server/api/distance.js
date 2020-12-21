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

  const { data } = await google.get("/distancematrix/json", {
    params: {
      origins,
      destinations,
      units: "imperial",
    },
  });
  return data;
};

/**
 * @returns a restaurant with distance and duration from Google Maps API
 * @param {Location} startingLocation the coordinate to begin with
 * @param {Restaurant} restaurant containing location
 */
const addDistanceToRestaurant = async (startingLocation, location) => {
  const res = await findDistance(startingLocation, location);
  const path = res.rows[0].elements[0];
  const distance = path.distance.text;
  const duration = path.duration.text;

  return { distance, duration };
};

module.exports = { defaultLocation, findDistance, addDistanceToRestaurant };
