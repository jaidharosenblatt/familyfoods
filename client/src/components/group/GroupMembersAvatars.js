import React from "react";
import { Space, Avatar } from "antd";

export default function GroupMembersAvatars({ members, numbers }) {
  return (
    <Space direction="vertical">
      {members.map((user, i) => {
        return (
          <p key={i}>
            {numbers && `${i + 1}.`} <Avatar src={user.avatar} />{" "}
            {user.username}
          </p>
        );
      })}
    </Space>
  );
}
