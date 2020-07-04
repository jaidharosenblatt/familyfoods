import React from "react";
import API from "../api/API";
import { Col } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";

const Restaurants = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  React.useEffect(() => {
    async function getRestaurants() {
      const res = await API.getRestaurants();
      const data = res.records.map((element) => element.fields);
      console.log(data);
      setRestaurants(data);
    }
    getRestaurants();
  }, []);
  return (
    <Col>
      {restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant.name} restaurant={restaurant} />;
      })}
    </Col>
  );
};

export default Restaurants;
