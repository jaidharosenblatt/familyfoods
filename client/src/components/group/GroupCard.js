import React from "react";
import { Button, Card } from "antd";

const GroupCard = ({ group }) => {
  console.log(group);

  return (
    <Card>
      <h1>{group.name}</h1>
      {group.members.map((user, i) => {
        return <div key={i}>{user.username}</div>;
      })}

      {group.public ? (
        <Button type="primary">Join</Button>
      ) : (
        <Button type="primary">Enter Password</Button>
      )}
    </Card>
  );
};
export default GroupCard;
