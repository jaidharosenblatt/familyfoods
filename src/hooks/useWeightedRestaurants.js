import useRestaurants from "./useRestaurants";

// Don't hate me I didn't wanna make a real backend :)

//weighted ordering
const weights = [0.15, 0.2, 0.25, 0.4];

//TODO replace w db call
const order = ["kaden", "jaidha", "cj", "gid"];

/**
 * Maps names to their weighting
 * ex: "kaden":0.15
 */
const getWeightedMap = () => {
  var map = {};
  for (let i = 0; i < order.length; i++) {
    let person = order[i];
    let weight = weights[i];
    map[person] = weight;
  }
  return { map };
};

/**
 * GETs all restaurants in the database and sorts based on
 * a weighted preference
 */
const useWeightedRestaurants = () => {
  const [restaurants] = useRestaurants();
  var weightedRestaurants = {};

  restaurants.forEach((restaurant) => {
    let score = getScore(restaurant);
    weightedRestaurants[restaurant.name] = { score, ...restaurant };
  });
  const sorted = sortRestaurants(weightedRestaurants);
  return { sorted };
};
/**
 * Sorts restaurants by score.
 * @param {*} restaurants map of restaurants where key is restaurant name
 * @return an array of restaurants in order
 */
const sortRestaurants = (restaurants) => {
  //Create an array where first item is restaurant object and second item is its score
  var sorted = [];
  for (var restaurant in restaurants) {
    sorted.push([restaurants[restaurant], restaurants[restaurant].score]);
  }

  // Sort by the score
  sorted.sort(function(a, b) {
    return b[1] - a[1];
  });

  // Create a new array and add the score back as an attribute to the restaurant
  var restaurantSorted = [];
  sorted.forEach((restaurant) => {
    restaurantSorted.push({ ...restaurant[0], score: restaurant[1] });
  });

  return restaurantSorted;
};

/**
 * Use weighted map to get score for a given restaurant
 * @param {*} restaurant object holding each persons ratings
 */
const getScore = (restaurant) => {
  const { map } = getWeightedMap();
  var score = 0;

  if (restaurant.kaden === undefined) {
    return score;
  }

  Object.keys(map).forEach((person) => {
    score = score + map[person] * restaurant[person];
  });
  score = score.toFixed(2);
  return score;
};

export default useWeightedRestaurants;
