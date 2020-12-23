import React, { useEffect, useState, useContext } from "react";
import { Space } from "antd";
import API from "../api/API";
import GroupCard from "../components/group/GroupCard";
import CreateGroup from "../components/group/CreateGroup";
import Context from "../context/Context";

const Groups = () => {
  const { state } = useContext(Context);
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
      <h1>Rating Groups</h1>
      <p>Join or create a group to use personalized ratings </p>
      {state.user && <CreateGroup />}
      {groups.map((group, i) => (
        <GroupCard key={i} group={group} />
      ))}
    </Space>
  );
};
export default Groups;
