import React, { useState, useEffect } from "react";
import { Space } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import Header from "../components/header/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../api/API";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [skip, setSkip] = useState(1);

  useEffect(() => {
    async function setInitialRestaurants() {
      const res = await API.getRestaurants(5, 0);
      setRestaurants(res);
    }
    setInitialRestaurants();
  }, []);

  async function fetchData() {
    const fetch = await API.getRestaurants(3, skip);
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
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {restaurants.map((restaurant, i) => {
          return <RestaurantCard key={i} restaurant={restaurant} />;
        })}
      </InfiniteScroll>
    </Space>
  );
};

export default Restaurants;
