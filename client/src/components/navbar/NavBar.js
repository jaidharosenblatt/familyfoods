import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import AuthNavBar from "./AuthNavBar";

import "./navbar.css";
import Context from "../../context/Context";

const NavBar = () => {
  const { state } = useContext(Context);
  return (
    <div className="navbar">
      <div className="mobile">
        <Space>
          <HeartFilled className="logo" />
          <h1>Eat Together</h1>
        </Space>
      </div>
      <div className="desktop">
        <div className="left">
          <Space size="large">
            <Link to="/">
              <span className="fake-link">
                <Space align="center" size={4}>
                  <HeartOutlined />
                  <p>Eat Together</p>
                </Space>
              </span>
            </Link>
            {state.user && (
              <Link to="/groups">
                <Space align="center" size={4}>
                  <TeamOutlined />
                  <p>Groups</p>
                </Space>
              </Link>
            )}
            <Link to="/add">
              <Space align="center" size={4}>
                <PlusCircleOutlined />
                <p>Add a Restaurant</p>
              </Space>
            </Link>
          </Space>
        </div>
        <div className="blur" />;
        <div className="right">
          <AuthNavBar />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
