import React, { useContext } from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Context from "../../context/Context";

const AuthNavBar = () => {
  const { state } = useContext(Context);

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.user) {
    return (
      <Link to="/profile">
        <Space>
          <UserOutlined />
          <p>{state.user.username}</p>
        </Space>
      </Link>
    );
  }
  return (
    <Space>
      <Link to="/signin">
        <Button>Sign In</Button>
      </Link>
      <Link to="/signup">
        <Button type="primary">Sign Up</Button>
      </Link>
    </Space>
  );
};

export default AuthNavBar;
