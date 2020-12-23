import React, { useContext } from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import API from "../../api/API";
import { logout } from "../../context/actionCreators";

const AuthNavBar = () => {
  const { state, dispatch } = useContext(Context);
  const handleLogout = async () => {
    await API.logout();
    dispatch(logout());
  };
  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.user) {
    return (
      <Space>
        <Link to="/profile">
          <p>{state.user.username}</p>
        </Link>
        <Link onClick={handleLogout} to="/">
          <p>Logout</p>
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
