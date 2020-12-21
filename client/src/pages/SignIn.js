import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import API from "../api/API";
import Context from "../context/Context";
import { setError, setUser, startLoading } from "../context/actionCreators";

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
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={() => dispatch(setError("Please input your password"))}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your email" }]}
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
      </Form>
    </div>
  );
};

export default SignIn;
