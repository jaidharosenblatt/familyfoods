import React from "react";
import { Space, Avatar } from "antd";

export default function GroupMembersAvatars({ members }) {
  return (
    <Space wrap>
      {members.map((user, i) => {
        return (
          <p key={i}>
            <Avatar src={user.avatar} /> {user.username}
          </p>
        );
      })}
    </Space>
  );
}
