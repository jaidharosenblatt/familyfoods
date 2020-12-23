import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import API from "../api/API";
import Context from "../context/Context";
import { setError, setUser, startLoading } from "../context/actionCreators";
import CenteredCard from "../components/centered-card/CenteredCard";
const SignIn = () => {
  const { state, dispatch } = useContext(Context);

  const onFinish = async (values) => {
    try {
      dispatch(startLoading());
      const user = await API.login(values);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(
        setError("Could not find an account for this username and password")
      );
    }
  };
  return (
    <CenteredCard>
      <h1>Welcome Back</h1>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={() => dispatch(setError("Please input your password"))}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          help={state.error}
          validateStatus={state.error ? "error" : "validating"}
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            loading={state.loading}
            type="primary"
            block
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
        <p>
          Don't have an account? <Link to="/signup">Sign up here.</Link>
        </p>
      </Form>
    </CenteredCard>
  );
};

export default SignIn;
