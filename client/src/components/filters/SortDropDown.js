import React, { useContext, useState } from "react";
import { Select } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import Context from "../../context/Context";
import { setSort } from "../../context/actionCreators";

/**
 * Render a dropdown with sort options and desc/asc icon
 * Controls sort state in Context
 * @param {Style} iconStyle inline CSS for styling icon
 */
export default function SortDropDown({ iconStyle }) {
  const { state, dispatch } = useContext(Context);

  // asc or desc
  const [sortDirection, setSortDirection] = useState("desc");

  let sortOptions = [
    { field: "myRating", name: "My Rating" },
    { field: "distance", name: "Distance" },
    { field: "name", name: "Name" },
    { field: "rating", name: "Google's Rating" },
    { field: "createdAt", name: "Created" },
  ];

  const handleSort = (key) => {
    if (!key) {
      return dispatch(setSort(undefined));
    }
    // Used as a query param for GET /restaurants
    // ex "updatedAt:desc"
    dispatch(setSort(`${key}:${sortDirection}`));
  };

  const handleSortDirection = () => {
    // flip direction
    const newDirection = sortDirection === "desc" ? "asc" : "desc";

    setSortDirection(newDirection);
    if (state.sort) {
      const [key] = state.sort.split(":");
      dispatch(setSort(`${key}:${newDirection}`));
    }
  };
  return (
    <div className="filter-dropdown">
      {sortDirection === "desc" ? (
        <SortDescendingOutlined
          onClick={handleSortDirection}
          style={iconStyle}
        />
      ) : (
        <SortAscendingOutlined
          onClick={handleSortDirection}
          style={iconStyle}
        />
      )}
      <Select
        onChange={handleSort}
        allowClear={true}
        placeholder="Sort Restaurants"
      >
        {sortOptions.map((option, i) => (
          <Select.Option key={option.field}>{option.name}</Select.Option>
        ))}
      </Select>
    </div>
  );
}
