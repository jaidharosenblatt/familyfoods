import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

import API from "../api/API";
import Context from "../context/Context";
import { setError, setUser, startLoading } from "../context/actionCreators";
import CenteredCard from "../components/centered-card/CenteredCard";
import PasswordWithConfirm from "../components/form/PasswordWithConfirm";

const SignUp = () => {
  const { state, dispatch } = useContext(Context);

  const onFinish = async (values) => {
    if (!values.username) {
      return dispatch(setError("Please input your username"));
    }
    delete values.confirm;
    try {
      dispatch(startLoading());
      const user = await API.signup(values);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error));
    }
  };
  return (
    <CenteredCard>
      <h1>Welcome to Family Foods</h1>
      <Form
        layout="vertical"
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
        <PasswordWithConfirm />
        <Form.Item>
          <Button
            loading={state.loading}
            type="primary"
            block
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form.Item>
        <p>
          Already have an account? <Link to="/signin">Sign in here.</Link>
        </p>
      </Form>
    </CenteredCard>
  );
};

export default SignUp;
