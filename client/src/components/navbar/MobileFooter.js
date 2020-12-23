import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import "./navbar.css";
import {
  PlusCircleFilled,
  SmileFilled,
  HomeFilled,
  UnlockFilled,
  TeamOutlined,
} from "@ant-design/icons";

import "./footer.css";
import Context from "../../context/Context";

const MobileFooter = () => {
  const { state } = useContext(Context);

  return (
    <div className="footer">
      <Row align="middle" gutter={8}>
        <Col span={6} align="center">
          <Link to={state.user ? "/profile" : "/signup"}>
            {state.user ? <SmileFilled /> : <UnlockFilled />}
            <p>{state.user ? state.user.username : "Sign Up"}</p>
          </Link>
        </Col>
        <Col span={6} align="center">
          <Link to="/">
            <HomeFilled />
            <p>Restaurants</p>
          </Link>
        </Col>
        <Col span={6} align="center">
          <Link to="/add">
            <PlusCircleFilled />
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
