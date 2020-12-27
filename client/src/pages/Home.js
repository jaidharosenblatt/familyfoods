import React from "react";
import Restaurants from "../components/restaurants/Restaurants";
import SignedInHeader from "../components/header/TopBlur";
import { Col, Row } from "antd";
import FilterPane from "../components/header/FilterPane";

const Home = () => {
  return (
    <div>
      <SignedInHeader />
      <div className="home-body">
        <Row>
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
