import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import API from "../api/API";
import Context from "../context/Context";
import {
  setError,
  setUser,
  startLoading,
  logout,
} from "../context/actionCreators";
import CenteredCard from "../components/centered-card/CenteredCard";
import LeftRightRow from "../components/left-right-row/LeftRightRow";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { state, dispatch } = useContext(Context);

  const handleLogout = async () => {
    await API.logout();
    dispatch(logout());
  };

  const onFinish = async (values) => {
    if (!values.username) {
      return dispatch(setError("Please input your username"));
    }
    try {
      dispatch(startLoading());
      const user = await API.editProfile(values);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error));
    }
  };
  return (
    <CenteredCard>
      <LeftRightRow
        left={<h1>Your Profile</h1>}
        right={
          <Link to="/">
            <Button
              onClick={handleLogout}
              danger
              loading={state.loading}
              block
              htmlType="submit"
            >
              Logout
            </Button>
          </Link>
        }
      />
      <Form
        layout="vertical"
        initialValues={state.user}
        onFinish={onFinish}
        onFinishFailed={() => dispatch(setError("Please input your password"))}
      >
        <Form.Item
          name="username"
          label="Username"
          help={state.error}
          validateStatus={state.error ? "error" : "validating"}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            loading={state.loading}
            type="primary"
            block
            htmlType="submit"
          >
            Make Changes
          </Button>
        </Form.Item>
      </Form>
    </CenteredCard>
  );
};

export default EditProfile;
