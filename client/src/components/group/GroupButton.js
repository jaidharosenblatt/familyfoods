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
    if (group.members.length > 1) {
      return (
        <Button onClick={deleteGroup} size="large" type="danger">
          Leave
        </Button>
      );
    }
    return (
      <Button onClick={deleteGroup} size="large" danger type="primary">
        Delete
      </Button>
    );
  }
  if (group.public) {
    return (
      <Button onClick={joinGroup} size="large" type="primary">
        Join
      </Button>
    );
  }
  return (
    <Button onClick={joinGroup} size="large" type="primary">
      Enter Password
    </Button>
  );
};

export default GroupButton;
