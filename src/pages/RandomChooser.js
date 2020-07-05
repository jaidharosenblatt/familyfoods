import React, { useState, useEffect } from "react";
import { Col, Spin, Button, Row, Space } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import getWeightedRestaurants from "../hooks/getWeightedRestaurants";
import useRestaurants from "../hooks/useRestaurants";
import "./pages.css";

const RandomChooser = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(["Kaden", "Jaidha", "CJ", "Gid"]);
  const [sortedRestaurants, setSortedRestaurants] = useState({
    all: [],
    col1: [],
    col2: [],
  });
  const [restaurants] = useRestaurants();

  function calc() {
    const res = getWeightedRestaurants(restaurants, order);
    var temp1 = [];
    var temp2 = [];

    res.forEach((element, index) => {
      if (index % 2 === 0) temp1.push(element);
      else temp2.push(element);
    });
    setSortedRestaurants({ all: res, col1: temp1, col2: temp2 });
  }

  const RenderCard = ({ restaurants }) => {
    return (
      <>
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard
              loading={loading}
              key={restaurant.name}
              restaurant={restaurant}
            />
          );
        })}
      </>
    );
  };

  const handleClick = () => {
    setLoading(true);
    setOrder(rotateOrder());
    calc();
    setTimeout(function() {
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    calc();
    setLoading(false);
  }, [restaurants]);

  //Shift order over by one
  const rotateOrder = () => {
    var rotatedArray = [...order];
    const x = order[order.length - 1];

    for (let i = order.length - 1; i > 0; i--) {
      rotatedArray[i] = rotatedArray[i - 1];
    }

    rotatedArray[0] = x;
    return rotatedArray;
  };

  return (
    <div className="chooser-container">
      <div className="chooser">
        <Space size={16} style={{ width: "100%" }} direction="vertical">
          <div>
            <h1>Random Restaurants</h1>
            <p>Click below to change who has the greatest preference</p>
            <Button disabled={loading} type="primary" onClick={handleClick}>
              Next in line!
            </Button>
          </div>

          <Row gutter={8}>
            {order.map((item, index) => {
              return (
                <Col span={24 / order.length} key={index}>
                  <b> {`Preference ${index + 1}`} </b>
                  <p>{item} </p>
                </Col>
              );
            })}
          </Row>
          {sortedRestaurants.all.length === 0 && (
            <Row align="center">
              <Spin size="large" />
            </Row>
          )}
          <Row gutter={8}>
            <Col xs={24} md={0}>
              <RenderCard restaurants={sortedRestaurants.all} />
            </Col>
            <Col xs={0} md={12}>
              <RenderCard restaurants={sortedRestaurants.col1} />
            </Col>
            <Col xs={0} md={12}>
              <RenderCard restaurants={sortedRestaurants.col2} />
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default RandomChooser;
