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

const CreateEditGroup = ({ group }) => {
  const { state, dispatch } = useContext(Context);
  const [locked, setLocked] = useState(group ? !group.public : false);
  const [visible, setVisible] = useState(false);

  const onFinish = async (form) => {
    try {
      const values = { ...form, public: !locked };
      dispatch(startLoading);
      const res = group
        ? await API.editGroup(group._id, values)
        : await API.createGroup(values);
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
      buttonText={group ? "Edit" : "Create a Group"}
    >
      <h1>{group ? "Edit" : "Create"} a Group</h1>
      <Form
        requiredMark={false}
        initialValues={group}
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
            <Switch
              defaultChecked={locked}
              onChange={() => setLocked(!locked)}
            />
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
            {group ? "Edit Group" : "Create Group"}
          </Button>
        </Form.Item>
      </Form>
    </ModalWithButton>
  );
};
export default CreateEditGroup;
