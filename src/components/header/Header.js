import React from "react";
import { Col, Card } from "antd";

const Header = () => {
  return (
    <Col span={24}>
      <Card>
        <h1>Random Restaurants</h1>
        <p>Click below to change who has the greatest preference</p>
      </Card>
    </Col>
  );
};

export default Header;
