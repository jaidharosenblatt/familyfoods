import React, { useState, useEffect, useContext } from "react";
import { Space, Col } from "antd";
import RestaurantCard from "./RestaurantCard";
import LoadingWrapper from "../loading/LoadingWrapper";
import Loading from "../loading/Loading";
import { FieldTimeOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../../api/API";
import Context from "../../context/Context";
import {
  refreshRestaurants,
  setRestaurants,
  setRestaurantsCount,
  startLoading,
} from "../../context/actionCreators";

const Restaurants = () => {
  const { state, dispatch } = useContext(Context);
  // page number for seen restaurants
  const [skip, setSkip] = useState(1);
  // the number of api calls on error
  const [resets, setResets] = useState(0);
  const [loading, setLoading] = useState(true);

  const limit = 10;
  const filterBy = state.filters.join(",");
  const params = {
    limit,
    group: state.group?._id,
    sortBy: state.sort,
    filterBy,
  };
  const doMoreRestaurantsExist = skip * limit <= state.restaurantsCount;
  const noRestaurants =
    state.restaurantsCount === 0 || state.restaurants?.length === 0;

  useEffect(() => {
    async function setInitialRestaurants() {
      setLoading(true);
      try {
        const res = await API.getRestaurants({ ...params, count: true });
        dispatch(setRestaurants(res.restaurants));
        dispatch(setRestaurantsCount(res.count));
      } catch (error) {
        if (resets < 3) {
          dispatch(refreshRestaurants());
          setResets(resets + 1);
        }
      } finally {
        setLoading(false);
      }
    }
    if (state.refreshRestaurants) {
      setInitialRestaurants();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.group, state.sort, state.filters, state.refreshRestaurants]);

  async function fetchData() {
    const fetch = await API.getRestaurants({ ...params, skip });
    const newRestaurants = state.restaurants.concat(fetch);
    setSkip(skip + 1);
    dispatch(setRestaurants(newRestaurants));
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={state.restaurants.length}
        next={fetchData}
        hasMore={doMoreRestaurantsExist}
        loader={<Loading />}
      >
        {loading && noRestaurants && <Loading />}
        <Space direction="vertical" style={{ width: "100%" }}>
          {state.restaurants.map((restaurant, i) => {
            return (
              <RestaurantCard
                loading={loading}
                key={i}
                restaurant={restaurant}
              />
            );
          })}
        </Space>
      </InfiniteScroll>
      {!loading && noRestaurants && (
        <Col span={24} align="middle">
          <FieldTimeOutlined style={{ fontSize: 32, color: "#262626" }} />
          <p>No restaurants yet</p>
        </Col>
      )}
    </div>
  );
};

export default Restaurants;
