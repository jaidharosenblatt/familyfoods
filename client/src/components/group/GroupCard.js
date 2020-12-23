import React from "react";
import { Button, Card, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const GroupCard = ({ group }) => {
  console.log(group);

  return (
    <Card>
      <Space direction="vertical">
        <h1>{group.name}</h1>
        <Space>
          {group.members.map((user, i) => {
            return (
              <p key={i}>
                <Avatar src={user.avatar} /> {user.username}
              </p>
            );
          })}
        </Space>
        {group.public ? (
          <Button type="primary">Join</Button>
        ) : (
          <Button type="primary">Enter Password</Button>
        )}
      </Space>
    </Card>
  );
};
export default GroupCard;
