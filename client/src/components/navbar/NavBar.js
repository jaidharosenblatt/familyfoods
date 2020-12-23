import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";
import {
  HomeFilled,
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

        <div className="right">
          <AuthNavBar />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
