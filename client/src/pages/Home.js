import React from "react";
import Restaurants from "../components/restaurants/Restaurants";
import { Col, Row } from "antd";
import FilterPane from "../components/filters/FilterPane";
import FilterPaneModal from "../components/filters/FilterPaneModal";

const Home = () => {
  const header = (
    <>
      <h1>Restaurants</h1>
      <p>Find where you should eat</p>
    </>
  );
  return (
    <div className="home-body">
      <Row gutter={24}>
        <Col xs={0} md={6}>
          {header}
          <FilterPane />
        </Col>

        <Col xs={24} md={18}>
          <FilterPaneModal />
          <Restaurants />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
