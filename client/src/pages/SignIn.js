import React from "react";
import { Form, Input, Button } from "antd";
import API from "../api/API";

const SignIn = () => {
  const onFinish = async (values) => {
    const res = await API.login(values);
    console.log(res);
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
