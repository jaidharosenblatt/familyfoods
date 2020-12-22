import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import "./navbar.css";
import {
  PlusCircleFilled,
  SignalFilled,
  DatabaseFilled,
} from "@ant-design/icons";

import "./footer.css";

const MobileFooter = () => {
  return (
    <div className="footer">
      <Row align="middle" gutter={8}>
        <Col span={8} align="center">
          <Link to="/all">
            <DatabaseFilled />
            <p>All</p>
          </Link>
        </Col>
        <Col span={8} align="center">
          <Link to="/">
            <SignalFilled />
            <p>Weighted</p>
          </Link>
        </Col>
        <Col span={8} align="center">
          <Link to="/add">
            <PlusCircleFilled />
            <p> Add</p>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default MobileFooter;
