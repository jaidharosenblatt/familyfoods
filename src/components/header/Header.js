import React from "react";
import { Col, Card } from "antd";

const Header = () => {
  return (
    <Col span={24}>
      <Card>
        <h1>Weighted Restaurants</h1>
        <p>The only way that everyone (kinda) gets what they want </p>
      </Card>
    </Col>
  );
};

export default Header;
