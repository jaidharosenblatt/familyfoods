import React, { useContext, useState } from "react";
import { Form, Input, Button, Space, Switch } from "antd";
import ModalWithButton from "../modal/ModalWithButton";
import API from "../../api/API";
import Context from "../../context/Context";
import { setError, stopLoading } from "../../context/actionCreators";

/**
 * Edit or create a group
 * Switches to edit if group is passed in
 * @param {Group} group
 */
const CreateEditGroup = ({ group }) => {
  const { state, dispatch } = useContext(Context);
  const [locked, setLocked] = useState(group ? !group.public : false);
  const [visible, setVisible] = useState(false);

  const onFinish = async (form) => {
    try {
      const values = { ...form, public: !locked };
      if (group) {
        await API.editGroup(group._id, values);
      } else {
        await API.createGroup(values);
      }

      dispatch(stopLoading());
      window.location.reload();

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
        onFinishFailed={() => dispatch(setError("Please input a name"))}
      >
        <Form.Item
          name="name"
          label="Group Name"
          help={state.error}
          validateStatus={state.error ? "error" : "validating"}
          rules={[{ required: true }]}
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
            rules={[{ required: true, message: "Please input a password" }]}
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
