import React, { useState, useEffect, useContext } from "react";
import { Space, Col } from "antd";
import RestaurantCard from "./RestaurantCard";
import LoadingWrapper from "../loading/LoadingWrapper";
import Loading from "../loading/Loading";
import { FieldTimeOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../../api/API";
import Context from "../../context/Context";
import { setRestaurants } from "../../context/actionCreators";

const Restaurants = () => {
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [restaurantsCount, setRestaurantsCount] = useState(0);
  const [skip, setSkip] = useState(1);

  const limit = 10;
  const filterBy = state.filters.join(",");
  const params = {
    limit,
    group: state.group?._id,
    sortBy: state.sort,
    filterBy,
  };
  const doMoreRestaurantsExist = skip * limit <= restaurantsCount;

  useEffect(() => {
    async function setInitialRestaurants() {
      console.log(params);
      const res = await API.getRestaurants({ ...params, count: true });
      dispatch(setRestaurants(res.restaurants));
      setRestaurantsCount(res.count);
      setLoading(false);
    }
    setInitialRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.group, state.sort, state.filters]);

  async function fetchData() {
    const fetch = await API.getRestaurants({ ...params, skip });
    const newRestaurants = state.restaurants.concat(fetch);
    setSkip(skip + 1);
    dispatch(setRestaurants(newRestaurants));
  }

  return (
    <LoadingWrapper>
      <InfiniteScroll
        dataLength={state.restaurants.length}
        next={fetchData}
        hasMore={doMoreRestaurantsExist}
        loader={<Loading />}
      >
        {loading && <Loading />}
        <Space direction="vertical" style={{ width: "100%" }}>
          {state.restaurants.map((restaurant, i) => {
            return <RestaurantCard key={i} restaurant={restaurant} />;
          })}
        </Space>
      </InfiniteScroll>
      {!loading && restaurantsCount === 0 && (
        <Col span={24} align="middle">
          <FieldTimeOutlined style={{ fontSize: 32, color: "#262626" }} />
          <p>No groups yet</p>
        </Col>
      )}
    </LoadingWrapper>
  );
};

export default Restaurants;
