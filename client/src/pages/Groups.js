import React, { useEffect, useState } from "react";
import { Space } from "antd";
import API from "../api/API";
import GroupCard from "../components/group/GroupCard";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchGroups() {
      const res = await API.getGroups();
      setGroups(res);
    }
    fetchGroups();
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {groups.map((group, i) => (
        <GroupCard key={i} group={group} />
      ))}
    </Space>
  );
};
export default Groups;
