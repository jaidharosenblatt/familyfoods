import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import "./pages.css";
import FilterCard from "../components/filters/FilterCard";
import Restaurants from "../components/restaurants/Restaurants";
import Header from "../components/header/Header";

const RandomChooser = () => {
  const [filters, setFilters] = useState({
    type: "All",
    price: "All",
    distance: "All",
  });

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
              <Restaurants />
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default RandomChooser;
