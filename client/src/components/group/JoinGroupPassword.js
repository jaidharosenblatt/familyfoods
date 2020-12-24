import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import ModalWithButton from "../modal/ModalWithButton";
import API from "../../api/API";
import Context from "../../context/Context";
import {
  addGroup,
  setError,
  startLoading,
  stopLoading,
} from "../../context/actionCreators";

const JoinGroupPassword = ({ group }) => {
  const { state, dispatch } = useContext(Context);
  const [visible, setVisible] = useState(false);

  const onFinish = async (form) => {
    try {
      dispatch(startLoading());
      await API.joinGroup(group._id, form.password);
      window.location.reload();
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
      buttonText="Enter Password"
    >
      <h1>Join {group.name}</h1>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={() => dispatch(setError("Please input a password"))}
      >
        <Form.Item
          name="password"
          label="Group Password"
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
            Join Group
          </Button>
        </Form.Item>
      </Form>
    </ModalWithButton>
  );
};
export default JoinGroupPassword;
