import React from "react";
import SortDropDown from "./SortDropDown";
import GroupDropDown from "./GroupDropDown";
import FilterDropDown from "./FilterDropDown";
import TakeTurn from "./TakeTurn";
import UpdateLocation from "./UpdateLocation";
import "./filters.css";

export default function FilterPane({ mobile }) {
  const iconStyle = { color: "#BFBFBF", fontSize: 20 };

  return (
    <div className="filters-pane">
      {mobile && (
        <>
          <h1>Options</h1>
          <p>
            Filter, sort, and take turns choosing restaurants with your groups
          </p>
        </>
      )}
      <GroupDropDown iconStyle={iconStyle} />
      <SortDropDown iconStyle={iconStyle} />
      <FilterDropDown iconStyle={iconStyle} />
      <TakeTurn />
      <UpdateLocation />
    </div>
  );
}
