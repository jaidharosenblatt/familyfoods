import React from "react";
import Restaurants from "../components/restaurants/Restaurants";
import { Col, Row } from "antd";
import FilterPane from "../components/header/FilterPane";

const Home = () => {
  return (
    <div>
      <div className="home-body">
        <Row gutter={24}>
          <Col md={6}>
            <FilterPane />
          </Col>
          <Col md={18}>
            <Restaurants />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
