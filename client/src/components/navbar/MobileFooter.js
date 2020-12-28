import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import "./navbar.css";
import {
  PlusCircleOutlined,
  UserOutlined,
  HomeOutlined,
  UnlockFilled,
  TeamOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import "./footer.css";
import Context from "../../context/Context";

const MobileFooter = () => {
  const { state } = useContext(Context);

  if (!state.user) {
    return (
      <div className="footer">
        <Row align="middle" gutter={8}>
          <Col span={8} align="center">
            <Link to="/signup">
              <UnlockFilled />
              <p>Sign Up</p>
            </Link>
          </Col>
          <Col span={8} align="center">
            <Link to="/">
              <HomeOutlined />
              <p>Restaurants</p>
            </Link>
          </Col>
          <Col span={8} align="center">
            <Link to="/signin">
              <LoginOutlined />
              <p>Sign In</p>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="footer">
      <Row align="middle" gutter={8}>
        <Col span={6} align="center">
          <Link to="/profile">
            <UserOutlined />
            <p>{state.user.username}</p>
          </Link>
        </Col>
        <Col span={6} align="center">
          <Link to="/">
            <HomeOutlined />
            <p>Restaurants</p>
          </Link>
        </Col>
        <Col span={6} align="center">
          <Link to="/add">
            <PlusCircleOutlined />
            <p> Add</p>
          </Link>
        </Col>
        <Col span={6} align="center">
          <Link to="/groups">
            <TeamOutlined />
            <p> Groups</p>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default MobileFooter;
