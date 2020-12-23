import React, { useContext, useState } from "react";
import { Form, Input, Button, Space, Switch } from "antd";
import ModalWithButton from "../modal/ModalWithButton";
import API from "../../api/API";
import Context from "../../context/Context";
import {
  addGroup,
  setError,
  startLoading,
  stopLoading,
} from "../../context/actionCreators";

const CreateGroup = () => {
  const { state, dispatch } = useContext(Context);
  const [locked, setLocked] = useState(false);
  const [visible, setVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      dispatch(startLoading);
      const res = await API.createGroup(values.name, values.password);
      dispatch(addGroup(res));
      dispatch(stopLoading());
      setVisible(false);
    } catch (error) {
      dispatch(setError(error));
    }
  };

  return (
    <ModalWithButton
      parentVisible={visible}
      setParentVisible={setVisible}
      buttonText="Create a Group"
    >
      <h1>Create a Group</h1>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={() => dispatch(setError("Please input your password"))}
      >
        <Form.Item
          name="name"
          label="Group Name"
          rules={[{ required: true, message: "Please input a name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            Require password
            <Switch onChange={() => setLocked(!locked)} />
          </Space>
        </Form.Item>

        {locked && (
          <Form.Item
            name="password"
            label="Group Password"
            help={state.error}
            validateStatus={state.error ? "error" : "validating"}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            loading={state.loading}
            type="primary"
            block
            htmlType="submit"
          >
            Create Group
          </Button>
        </Form.Item>
      </Form>
    </ModalWithButton>
  );
};
export default CreateGroup;
