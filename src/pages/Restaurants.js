import React from "react";
import { Space } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import useRestaurants from "../functions/useRestaurants";
import Header from "../components/header/Header";

const Restaurants = () => {
  const [restaurants] = useRestaurants();
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Header
        h1="All Restaurants"
        p="Show all the restaurants in the database"
      />
      {restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant.name} restaurant={restaurant} />;
      })}
    </Space>
  );
};

export default Restaurants;
