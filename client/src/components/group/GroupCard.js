import React from "react";
import { Card, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import GroupButton from "./GroupButton";
import LeftRightRow from "../left-right-row/LeftRightRow";
import { stringToTimeAgo } from "../../util/date";

const GroupCard = ({ group, userInGroup }) => {
  return (
    <Card>
      <LeftRightRow
        left={
          <Space direction="vertical">
            <h2>{group.name}</h2>
            <p> Active {stringToTimeAgo(group.updatedAt)}</p>
            <Space>
              {group.members.map((user, i) => {
                return (
                  <p key={i}>
                    <Avatar src={user.avatar} /> {user.username}
                  </p>
                );
              })}
            </Space>
          </Space>
        }
        right={<GroupButton group={group} userInGroup={userInGroup} />}
      />
    </Card>
  );
};
export default GroupCard;
