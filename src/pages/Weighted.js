import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import getWeightedRestaurants from "../functions/getWeightedRestaurants";
import useRestaurants from "../functions/useRestaurants";
import "./pages.css";
import WeightsChooser from "../components/filters/WeightsChooser";
import FilterCard from "../components/filters/FilterCard";
import Order from "../components/filters/Order";

import Header from "../components/header/Header";

const RandomChooser = () => {
  const [filters, setFilters] = useState({
    type: "All",
    price: "All",
    distance: "All",
  });
  const initialWeights = [60, 20, 10, 10];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [weights, setWeights] = useState(initialWeights);
  const [order, setOrder] = useState(["Kaden", "Jaidha", "CJ", "Gid"]);
  const [sortedRestaurants, setSortedRestaurants] = useState({
    all: [],
    col1: [],
    col2: [],
  });

  const [restaurants] = useRestaurants();

  useEffect(() => {
    calc();
    setLoading(false);
    // eslint-disable-next-line
  }, [restaurants, weights, order, filters]);

  const onWeightChange = (value, index) => {
    setLoading(true);

    var newWeights = weights;
    newWeights[index] = value;
    let sum = 0;
    weights.forEach((weight) => {
      sum += weight;
    });
    if (sum !== 100) {
      setError("Please create an order total that adds up to 100");
    } else {
      setError("");
    }
    setWeights(newWeights);

    setTimeout(function() {
      calc();
      setLoading(false);
    }, 700);
  };

  const handleClick = () => {
    setLoading(true);
    setOrder(rotateOrder());
    calc();
    setTimeout(function() {
      setLoading(false);
    }, 700);
  };

  function calc() {
    const res = getWeightedRestaurants(restaurants, order, weights, filters);
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
        <Col>
          <Header />
          {error !== "" && (
            <p style={{ margin: 8, color: "#EF4138" }}> {error}</p>
          )}

          <Row>
            <Col xs={24} md={10}>
              <Order
                loading={loading}
                handleClick={handleClick}
                order={order}
              />
              <FilterCard filters={filters} setFilters={setFilters} />
              <WeightsChooser
                order={order}
                initialWeights={initialWeights}
                onWeightChange={onWeightChange}
              />
            </Col>
            <Col xs={24} md={14}>
              <Row align="center">
                {sortedRestaurants.all.length === 0 && (
                  <p> No restaurants found</p>
                )}
              </Row>
              <RenderCard restaurants={sortedRestaurants.all} />
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default RandomChooser;
