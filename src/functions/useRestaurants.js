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
      const data = res.records.map((element) => element.fields);
      setRestaurants(data);
    }
    getRestaurants();
  }, []);
  return [restaurants];
};

export default useRestaurants;
