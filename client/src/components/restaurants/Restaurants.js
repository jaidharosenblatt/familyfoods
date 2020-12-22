import React, { useState, useEffect, useContext } from "react";
import { Space } from "antd";
import RestaurantCard from "./RestaurantCard";
import LoadingWrapper from "../loading/LoadingWrapper";
import Loading from "../loading/Loading";

import InfiniteScroll from "react-infinite-scroll-component";
import API from "../../api/API";
import Context from "../../context/Context";
import { startLoading, stopLoading } from "../../context/actionCreators";

const Restaurants = () => {
  const { dispatch } = useContext(Context);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsCount, setRestaurantsCount] = useState(0);
  const [skip, setSkip] = useState(1);

  const limit = 7;
  const doMoreRestaurantsExist = skip * limit <= restaurantsCount;

  useEffect(() => {
    async function setInitialRestaurants() {
      dispatch(startLoading());
      const res = await API.getInitialRestaurants(limit);
      setRestaurants(res.restaurants);
      setRestaurantsCount(res.count);
      dispatch(stopLoading());
    }
    setInitialRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const fetch = await API.getMoreRestaurants(limit, skip);
    const newRestaurants = restaurants.concat(fetch);
    setSkip(skip + 1);
    setRestaurants(newRestaurants);
  }

  return (
    <LoadingWrapper>
      <InfiniteScroll
        dataLength={restaurants.length} //This is important field to render the next data
        next={fetchData}
        hasMore={doMoreRestaurantsExist}
        loader={<Loading />}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {restaurants.map((restaurant, i) => {
            return <RestaurantCard key={i} restaurant={restaurant} />;
          })}
        </Space>
      </InfiniteScroll>
    </LoadingWrapper>
  );
};

export default Restaurants;
