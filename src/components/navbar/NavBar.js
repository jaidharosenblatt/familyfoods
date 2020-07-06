import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col, Space } from "antd";
import "./navbar.css";
import { HomeFilled } from "@ant-design/icons";

const NavBar = () => {
  return (
    <div className="navbar">
      <Col xs={24} md={0} align="center" style={{ backgroundColor: "#1890FF" }}>
        <div className="mobile-wrapper">
          <Space>
            <HomeFilled className="logo-mobile" />
            <h1>Family Foods</h1>
          </Space>
        </div>
      </Col>
      <Col xs={0} md={24}>
        <Row align="middle" gutter={8}>
          <Link to="/">
            <Space align="center" size={0}>
              <HomeFilled className="logo" />
              <p>Family Foods</p>
            </Space>
          </Link>
          <Menu mode="horizontal">
            <Menu.Item key="random">
              <Link to="/">Weighted</Link>
            </Menu.Item>
            <Menu.Item key="all">
              <Link to="/all">Show All</Link>
            </Menu.Item>
            <Menu.Item key="add">
              <Link to="/add">Add Restaurant</Link>
            </Menu.Item>
          </Menu>
        </Row>
      </Col>
    </div>
  );
};

export default NavBar;
