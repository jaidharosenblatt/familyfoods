import React from "react";
import SortDropDown from "./SortDropDown";
import GroupDropDown from "./GroupDropDown";
import FilterDropDown from "./FilterDropDown";
import TakeTurn from "./TakeTurn";
import UpdateLocation from "./UpdateLocation";
import { Space } from "antd";
import "./filters.css";

export default function FilterPane() {
  const iconStyle = { color: "#BFBFBF", fontSize: 20 };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <h1>Restaurants</h1>
      <p>Find where you should eat</p>
      <GroupDropDown iconStyle={iconStyle} />
      <SortDropDown iconStyle={iconStyle} />
      <FilterDropDown iconStyle={iconStyle} />
      <TakeTurn />
      <UpdateLocation />
    </Space>
  );
}
