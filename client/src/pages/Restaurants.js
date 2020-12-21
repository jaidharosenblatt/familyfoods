import React, { useState, useEffect } from "react";
import { Space } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import Header from "../components/header/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../api/API";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsCount, setRestaurantsCount] = useState(0);
  const [skip, setSkip] = useState(1);

  const limit = 5;
  const doMoreRestaurantsExist = skip * limit <= restaurantsCount;

  useEffect(() => {
    async function setInitialRestaurants() {
      const res = await API.getInitialRestaurants(5);
      setRestaurants(res.restaurants);
      setRestaurantsCount(res.count);
    }
    setInitialRestaurants();
  }, []);

  async function fetchData() {
    const fetch = await API.getMoreRestaurants(limit, skip);
    const newRestaurants = restaurants.concat(fetch);

    setSkip(skip + 1);
    setRestaurants(newRestaurants);
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Header
        h1="All Restaurants"
        p="Show all the restaurants in the database"
      />

      <InfiniteScroll
        dataLength={restaurants.length} //This is important field to render the next data
        next={fetchData}
        hasMore={doMoreRestaurantsExist}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {restaurants.map((restaurant, i) => {
            return <RestaurantCard key={i} restaurant={restaurant} />;
          })}
        </Space>
      </InfiniteScroll>
    </Space>
  );
};

export default Restaurants;
