import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import useRestaurants from "../functions/useRestaurants";
import "./pages.css";
import FilterCard from "../components/filters/FilterCard";
import Header from "../components/header/Header";

const RandomChooser = () => {
  const [filters, setFilters] = useState({
    type: "All",
    price: "All",
    distance: "All",
  });

  const [restaurants] = useRestaurants();
  console.log(restaurants);

  return (
    <div className="chooser-container">
      <div className="chooser">
        <Col>
          <Header
            h1="Weighted Restaurants"
            p="The only way that everyone (kinda) gets what they want "
          />

          <Row>
            <Col xs={24} md={10}>
              <FilterCard filters={filters} setFilters={setFilters} />

              <div className="button-wrapper">
                <Button block type="primary">
                  Next in line!
                </Button>
              </div>
            </Col>
            <Col xs={24} md={14}>
              <Row align="center">
                {restaurants.length === 0 && <p> No restaurants found</p>}
              </Row>
              {restaurants.map((restaurant, i) => (
                <RestaurantCard key={i} restaurant={restaurant} />
              ))}
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default RandomChooser;
