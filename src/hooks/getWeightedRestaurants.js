// Don't hate me I didn't wanna make a real backend :)

/**
 * GETs all restaurants in the database and sorts based on
 * a weighted preference
 */
function getWeightedRestaurants(restaurants, order) {
  const weights = [0.6, 0.2, 0.1, 0.1];

  //Create a map of person and their average score
  const personAverageScore = {};
  order.forEach((person) => {
    let score = 0;
    let ratings = 0;
    restaurants.forEach((restaurant) => {
      if (restaurant[person]) {
        ratings++;
        score = score + restaurant[person];
      }
    });
    personAverageScore[person] = score / ratings;
  });

  //Add person's average score for blank values
  order.forEach((person) => {
    restaurants.forEach((restaurant) => {
      if (!restaurant[person]) {
        restaurant[person] = personAverageScore[person];
      }
    });
  });

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

  var weightedRestaurants = {};

  restaurants.forEach((restaurant) => {
    let score = getScore(restaurant);
    weightedRestaurants[restaurant.name] = { score, ...restaurant };
  });
  const sorted = sortRestaurants(weightedRestaurants);
  return sorted;
}

export default getWeightedRestaurants;
