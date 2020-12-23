import React, { useContext } from "react";
import { Space } from "antd";
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
  return <Link to="/signin">Sign In</Link>;
};

export default AuthNavBar;
