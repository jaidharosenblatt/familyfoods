import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Space } from "antd";
import { Logo } from "../../static/Images";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Row align="middle" gutter={8}>
        <Link to="/">
          <Space align="center">
            <img src={Logo} alt="logo" className="Logo" />
            <h1>Family Foods</h1>
          </Space>
        </Link>

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
      </Row>
    </div>
  );
};

export default NavBar;
