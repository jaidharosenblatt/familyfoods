import React, { useContext, useState } from "react";
import { Button, Space } from "antd";
import Context from "../../context/Context";
import API from "../../api/API";
import GroupMembersAvatars from "../group/GroupMembersAvatars";

export default function TakeTurn() {
  const [group, setGroup] = useState();
  const { state } = useContext(Context);

  const takeTurn = async () => {
    const res = await API.takeTurn(state.group._id);
    setGroup(res);
  };

  if (!state.group) {
    return null;
  }
  return (
    <Space>
      <Button onClick={takeTurn} block type="primary">
        Take a turn
      </Button>
      <Space>
        {group && <GroupMembersAvatars members={group.shiftedMembers} />}
      </Space>
    </Space>
  );
}
