import React from "react";
import { Col, Card, Row, Space } from "antd";

import SortDropDown from "./SortDropDown";
import GroupDropDown from "./GroupDropDown";
import "./header.css";

const SignedInHeader = () => {
  // Since ant select uses anticon svg, we can't style with CSS
  const iconStyle = { color: "#BFBFBF", fontSize: 20 };

  return (
    <div className="header">
      <Card>
        <Row>
          <Col xs={24} lg={12}>
            <h1>Restaurants</h1>
            <p>Find where you should eat</p>
          </Col>
          <Col xs={24} lg={12} align="right">
            <Space align="left">
              <SortDropDown iconStyle={iconStyle} />
              <GroupDropDown iconStyle={iconStyle} />
            </Space>
          </Col>
        </Row>
      </Card>
      <div className="blur" />
    </div>
  );
};

export default SignedInHeader;
