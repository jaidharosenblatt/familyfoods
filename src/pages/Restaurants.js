import React from "react";
import API from "../api/API";

const Restaurants = () => {
  React.useEffect(() => {
    async function getRestaurants() {
      const res = await API.getRestaurants();
      console.log(res);
    }
    getRestaurants();
  }, []);
  return <div>Restaurants</div>;
};

export default Restaurants;
