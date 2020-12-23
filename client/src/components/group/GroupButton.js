import React from "react";
import { Button } from "antd";
import API from "../../api/API";

const GroupButton = ({ group, userIsOwner }) => {
  const deleteGroup = async () => {
    await API.deleteGroup(group._id);
  };

  const joinGroup = async () => {
    await API.joinGroup(group._id);
  };

  if (userIsOwner) {
    return (
      <Button onClick={deleteGroup} size="large" type="danger">
        {group.members.length > 1 ? "Leave Group" : "Delete Group"}
      </Button>
    );
  }

  return (
    <Button onClick={joinGroup} size="large" type="primary">
      {group.public ? "Join Group" : "Enter Password"}
    </Button>
  );
};

export default GroupButton;
