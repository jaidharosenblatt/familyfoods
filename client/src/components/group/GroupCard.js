import React from "react";
import { Card, Space } from "antd";
import GroupButton from "./GroupButton";
import LeftRightRow from "../left-right-row/LeftRightRow";
import { stringToTimeAgo } from "../../util/date";
import GroupMembersAvatars from "./GroupMembersAvatars";

/**
 * Render out a group's card
 * @param {Group} group to render
 * @param {Boolean} userInGroup
 */
const GroupCard = ({ group, userInGroup }) => {
  return (
    <Card>
      <LeftRightRow
        left={
          <Space direction="vertical">
            <h2>{group.name}</h2>
            <p> Active {stringToTimeAgo(group.updatedAt)}</p>
            <GroupMembersAvatars members={group.members} />
          </Space>
        }
        right={<GroupButton group={group} userInGroup={userInGroup} />}
      />
    </Card>
  );
};
export default GroupCard;
