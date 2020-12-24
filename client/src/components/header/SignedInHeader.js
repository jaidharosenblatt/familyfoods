import React from "react";
import { Col, Card, Row } from "antd";

import SortDropDown from "./SortDropDown";
import GroupDropDown from "./GroupDropDown";

import "./header.css";
import FilterDropDown from "./FilterDropDown";

const SignedInHeader = () => {
  // Since ant select uses anticon svg, we can't style with CSS
  const iconStyle = { color: "#BFBFBF", fontSize: 20 };

  return (
    <div className="header">
      <Card>
        <Row gutter={24}>
          <Col xs={24} md={6}>
            <h1>Restaurants</h1>
            <p>Find where you should eat</p>
          </Col>
          <Col xs={24} md={18}>
            <Row>
              <GroupDropDown iconStyle={iconStyle} />
              <SortDropDown iconStyle={iconStyle} />
              <FilterDropDown iconStyle={iconStyle} />
            </Row>
          </Col>
        </Row>
      </Card>
      <div className="blur" />
    </div>
  );
};

export default SignedInHeader;
