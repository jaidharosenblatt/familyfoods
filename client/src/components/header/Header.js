import React from "react";
import { Col, Card } from "antd";

const Header = ({ h1, p }) => {
  return (
    <Col span={24}>
      <Card>
        <h1>{h1}</h1>
        <p>{p}</p>
      </Card>
    </Col>
  );
};

export default Header;
