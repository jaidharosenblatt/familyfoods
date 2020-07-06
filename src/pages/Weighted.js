import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import getWeightedRestaurants from "../functions/getWeightedRestaurants";
import useRestaurants from "../functions/useRestaurants";
import rotateOrder from "../functions/rotateOrder";
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
  const [sortedRestaurants, setSortedRestaurants] = useState([]);

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
    setOrder(rotateOrder(order));
    calc();
    setTimeout(function() {
      setLoading(false);
    }, 700);
  };

  function calc() {
    const res = getWeightedRestaurants(restaurants, order, weights, filters);
    setSortedRestaurants(res);
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

  return (
    <div className="chooser-container">
      <div className="chooser">
        <Col>
          <Header
            h1="Weighted Restaurants"
            p="The only way that everyone (kinda) gets what they want "
          />
          {error !== "" && (
            <p style={{ margin: 8, color: "#EF4138" }}> {error}</p>
          )}
          <Button disabled={loading} type="primary" onClick={handleClick}>
            Next in line!
          </Button>

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
                {sortedRestaurants.length === 0 && <p> No restaurants found</p>}
              </Row>
              <RenderCard restaurants={sortedRestaurants} />
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default RandomChooser;
