import React from "react";
import { Col, Card } from "antd";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Col span={24}>
        <Card>
          <h1>Restaurants</h1>
          <p>Find where you should eat</p>
        </Card>
      </Col>
      <div className="blur" />
    </div>
  );
};

export default Header;
