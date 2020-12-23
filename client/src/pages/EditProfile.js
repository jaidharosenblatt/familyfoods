import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import API from "../api/API";
import Context from "../context/Context";
import { setError, setUser, startLoading } from "../context/actionCreators";
import CenteredCard from "../components/centered-card/CenteredCard";

const EditProfile = () => {
  const { state, dispatch } = useContext(Context);

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
      <h1>{state.user.username}, edit your profile</h1>
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
