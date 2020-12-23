import React from "react";
import { Button } from "antd";

const GroupButton = ({ group, userIsOwner }) => {
  if (userIsOwner) {
    if (group.members.length > 1) {
      return (
        <Button size="large" type="danger">
          Leave
        </Button>
      );
    }
    return (
      <Button size="large" danger type="primary">
        Delete
      </Button>
    );
  }
  if (group.public) {
    return (
      <Button size="large" type="primary">
        Join
      </Button>
    );
  }
  return (
    <Button size="large" type="primary">
      Enter Password
    </Button>
  );
};

export default GroupButton;
