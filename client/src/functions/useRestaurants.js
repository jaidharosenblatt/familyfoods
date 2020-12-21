import { useState, useEffect } from "react";
import API from "../api/API";

/**
 * Logic for getting an array of restaurants
 */
const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function getRestaurants() {
      const res = await API.getRestaurants();
      setRestaurants(res);
    }
    getRestaurants();
  }, []);
  return [restaurants];
};

export default useRestaurants;
