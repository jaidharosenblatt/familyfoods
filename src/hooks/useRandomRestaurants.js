// Don't hate me I didn't wanna make a real backend :)
import useRestaurants from "./useRestaurants";

const weights = [0.15, 0.2, 0.25, 0.4];

//replace w db call
const order = ["kaden", "jaidha", "cj", "gid"];

const getWeightedMap = () => {
  var map = {};
  for (let i = 0; i < order.length; i++) {
    let person = order[i];
    let weight = weights[i];
    map[person] = weight;
  }
  return { map };
};

const useRandomRestaurants = () => {
  const [restaurants] = useRestaurants();
  restaurants.forEach((restaurant) => getScore(restaurant));
};

const getScore = (restaurant) => {
  var score = 0;
  if (restaurant.kaden === undefined) {
    return score;
  }

  console.log(restaurant.name);
  const { map } = getWeightedMap();

  Object.keys(map).forEach((person) => {
    score = score + map[person] * restaurant[person];
  });
  var round = score.toFixed(2);
  console.log(round);
};

export default useRandomRestaurants;
