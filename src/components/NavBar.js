import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col } from "antd";
import { Logo } from "../static/Images";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Row align="middle" gutter={8}>
        <Col align="center" span={2}>
          <Link to="/">
            <img src={Logo} alt="logo" className="Logo" />
          </Link>
        </Col>

        <Col span={22}>
          <Menu mode="horizontal">
            <Menu.Item key="random">
              <Link to="/random">Random</Link>
            </Menu.Item>
            <Menu.Item key="add">
              <Link to="/add">Add Restaurant</Link>
            </Menu.Item>
            <Menu.Item key="all">
              <Link to="/all">Show All</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default NavBar;
