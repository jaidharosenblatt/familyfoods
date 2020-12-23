import React, { useEffect, useState } from "react";
import { Button, Space, Col } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";

import API from "../api/API";
import GroupCard from "../components/group/GroupCard";
import CreateGroup from "../components/group/CreateEditGroup";
import LeftRightRow from "../components/left-right-row/LeftRightRow";

const Groups = () => {
  const [otherGroups, setOtherGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [joinGroups, setJoinGroups] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      const res = await API.getGroups(true);
      setMyGroups(res.myGroups);
      setOtherGroups(res.otherGroups);
      if (res.myGroups.length === 0) {
        setJoinGroups(true);
      }
    }
    fetchGroups();
  }, []);

  const groups = joinGroups ? otherGroups : myGroups;
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <LeftRightRow
        left={
          <Space direction="vertical" size={0}>
            <h1>{!joinGroups && "My"} Groups</h1>
            <p>Join or create a group to use personalized ratings </p>{" "}
          </Space>
        }
        right={
          <Space>
            <CreateGroup />
            <Button onClick={() => setJoinGroups(!joinGroups)} type="primary">
              {joinGroups ? "View My Groups" : "Join a Group"}
            </Button>
          </Space>
        }
      />

      {groups.map((group, i) => (
        <GroupCard key={i} group={group} userInGroup={!joinGroups} />
      ))}
      {groups.length === 0 && (
        <Col span={24} align="middle">
          <FieldTimeOutlined style={{ fontSize: 32, color: "#262626" }} />
          <p>No groups yet</p>
        </Col>
      )}
    </Space>
  );
};
export default Groups;
