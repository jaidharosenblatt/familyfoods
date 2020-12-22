import React from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col, Space } from "antd";
import "./navbar.css";
import { HomeFilled, PlusCircleFilled } from "@ant-design/icons";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="mobile">
        <Space>
          <HomeFilled className="logo" />
          <h1>Family Foods</h1>
        </Space>
      </div>
      <div className="desktop">
        <div className="left">
          <Space size="large">
            <Link to="/">
              <Space align="center" size={4}>
                <HomeFilled />
                <p>Family Foods</p>
              </Space>
            </Link>
            <Link to="/add">
              <Space align="center" size={4}>
                <PlusCircleFilled />
                <p>Add a Restaurant</p>
              </Space>
            </Link>
          </Space>
        </div>

        <div className="right">
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
