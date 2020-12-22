import React from "react";
import { Col, Card } from "antd";
import "./header.css";

const Header = ({ h1, p }) => {
  return (
    <div className="header">
      <Col span={24}>
        <Card>
          <h1>{h1}</h1>
          <p>{p}</p>
        </Card>
      </Col>
      <div className="blur" />
    </div>
  );
};

export default Header;
