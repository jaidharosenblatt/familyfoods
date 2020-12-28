import React from "react";
import SortDropDown from "./SortDropDown";
import FilterDropDown from "./FilterDropDown";
import UpdateLocation from "./UpdateLocation";
import "./filters.css";
import GroupFilter from "./GroupFilter";

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
      <GroupFilter iconStyle={iconStyle} />

      <SortDropDown iconStyle={iconStyle} />
      <FilterDropDown iconStyle={iconStyle} />
      <UpdateLocation />
    </div>
  );
}
