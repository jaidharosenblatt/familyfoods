import React, { useContext } from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import Context from "../../context/Context";

const AuthNavBar = () => {
  const { state } = useContext(Context);

  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.user) {
    return (
      <Space>
        <Link to="/profile">
          <p>{state.user.username}</p>
        </Link>
      </Space>
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
