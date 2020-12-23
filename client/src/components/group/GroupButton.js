import React, { useContext } from "react";
import { Button, Space } from "antd";
import API from "../../api/API";
import Context from "../../context/Context";
import CreateEditGroup from "./CreateEditGroup";
import JoinGroupPassword from "./JoinGroupPassword";

const GroupButton = ({ group, userInGroup }) => {
  const { state } = useContext(Context);
  const deleteGroup = async () => {
    await API.deleteGroup(group._id);
  };

  const joinGroup = async () => {
    await API.joinGroup(group._id);
  };

  if (group.owner === state.user._id) {
    return (
      <Space>
        <CreateEditGroup group={group} />
        <Button onClick={deleteGroup} type="danger">
          {group.members.length > 1 ? "Leave Group" : "Delete Group"}
        </Button>
      </Space>
    );
  }

  if (userInGroup) {
    return (
      <Button onClick={deleteGroup} type="danger">
        {group.members.length > 1 ? "Leave Group" : "Delete Group"}
      </Button>
    );
  }

  return group.public ? (
    <Button onClick={joinGroup} type="primary">
      Join Group
    </Button>
  ) : (
    <JoinGroupPassword group={group} />
  );
};

export default GroupButton;
