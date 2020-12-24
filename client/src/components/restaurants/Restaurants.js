import React, { useState, useEffect } from "react";
import { Space, Col } from "antd";
import RestaurantCard from "./RestaurantCard";
import LoadingWrapper from "../loading/LoadingWrapper";
import Loading from "../loading/Loading";
import { FieldTimeOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../../api/API";

const Restaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsCount, setRestaurantsCount] = useState(0);
  const [skip, setSkip] = useState(1);

  const limit = 10;
  const doMoreRestaurantsExist = skip * limit <= restaurantsCount;

  useEffect(() => {
    async function setInitialRestaurants() {
      const res = await API.getInitialRestaurants(limit);
      setRestaurants(res.restaurants);
      setRestaurantsCount(res.count);
      setLoading(false);
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

  const makeReview = async (restaurant, rating) => {
    await API.createReview(restaurant, rating);
    const updatedRestaurants = restaurants.map((r) => {
      return r._id === restaurant ? { ...r, myRating: rating } : r;
    });
    setRestaurants(updatedRestaurants);
  };

  return (
    <LoadingWrapper>
      <InfiniteScroll
        dataLength={restaurants.length}
        next={fetchData}
        hasMore={doMoreRestaurantsExist}
        loader={<Loading />}
      >
        {loading && <Loading />}
        <Space direction="vertical" style={{ width: "100%" }}>
          {restaurants.map((restaurant, i) => {
            return (
              <RestaurantCard
                key={i}
                restaurant={restaurant}
                makeReview={makeReview}
              />
            );
          })}
        </Space>
      </InfiniteScroll>
      {!loading && restaurants.length === 0 && (
        <Col span={24} align="middle">
          <FieldTimeOutlined style={{ fontSize: 32, color: "#262626" }} />
          <p>No groups yet</p>
        </Col>
      )}
    </LoadingWrapper>
  );
};

export default Restaurants;
