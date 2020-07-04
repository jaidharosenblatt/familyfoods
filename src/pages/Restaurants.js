import React from "react";
import { Col } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import useRestaurants from "../hooks/useRestaurants";

const Restaurants = () => {
  const [restaurants] = useRestaurants();
  return (
    <Col>
      {restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant.name} restaurant={restaurant} />;
      })}
    </Col>
  );
};

export default Restaurants;
