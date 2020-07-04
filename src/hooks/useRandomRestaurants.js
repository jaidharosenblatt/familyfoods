// Don't hate me I didn't wanna make a real backend :)
import useRestaurants from "./useRestaurants";

const useRandomRestaurants = () => {
  const [restaurants] = useRestaurants();
  console.log(restaurants);
};

export default useRandomRestaurants;
