import React, { useState, useEffect, useContext } from "react";
import { Space, Spin } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import Loading from "../components/loading/Loading";

import Header from "../components/header/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../api/API";
import Context from "../context/Context";
import { startLoading, stopLoading } from "../context/actionCreators";

const Restaurants = () => {
  const { dispatch } = useContext(Context);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsCount, setRestaurantsCount] = useState(0);
  const [skip, setSkip] = useState(1);

  const limit = 5;
  const doMoreRestaurantsExist = skip * limit <= restaurantsCount;

  useEffect(() => {
    async function setInitialRestaurants() {
      dispatch(startLoading());
      const res = await API.getInitialRestaurants(5);
      setRestaurants(res.restaurants);
      setRestaurantsCount(res.count);
      dispatch(stopLoading());
    }
    setInitialRestaurants();
  }, []);

  async function fetchData() {
    dispatch(startLoading());
    const fetch = await API.getMoreRestaurants(limit, skip);
    const newRestaurants = restaurants.concat(fetch);
    setSkip(skip + 1);
    setRestaurants(newRestaurants);
    dispatch(stopLoading());
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Header
        h1="All Restaurants"
        p="Show all the restaurants in the database"
      />
      <Loading>
        <InfiniteScroll
          dataLength={restaurants.length} //This is important field to render the next data
          next={fetchData}
          hasMore={doMoreRestaurantsExist}
          loader={<Spin />}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {restaurants.map((restaurant, i) => {
              return <RestaurantCard key={i} restaurant={restaurant} />;
            })}
          </Space>
        </InfiniteScroll>
      </Loading>
    </Space>
  );
};

export default Restaurants;
