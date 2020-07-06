import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Space } from "antd";
import "./navbar.css";
import { HomeFilled } from "@ant-design/icons";

const NavBar = () => {
  return (
    <div className="navbar">
      <Row align="middle" gutter={8}>
        <Link to="/">
          <Space align="center" size={0}>
            <HomeFilled className="Logo" />
            <p>Family Foods</p>
          </Space>
        </Link>

        <Menu mode="horizontal">
          <Menu.Item key="random">
            <Link to="/random">Random</Link>
          </Menu.Item>
          <Menu.Item key="all">
            <Link to="/all">Show All</Link>
          </Menu.Item>
          <Menu.Item key="add">
            <Link to="/add">Add Restaurant</Link>
          </Menu.Item>
        </Menu>
      </Row>
    </div>
  );
};

export default NavBar;
