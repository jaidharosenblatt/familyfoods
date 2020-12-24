import React, { useContext } from "react";
import { Select, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import Context from "../../context/Context";
import { setFilters } from "../../context/actionCreators";

/**
 * Render a dropdown with sort options and desc/asc icon
 * Controls sort state in Context
 * @param {Style} iconStyle inline CSS for styling icon
 */
export default function FilterDropDown({ iconStyle }) {
  const { state, dispatch } = useContext(Context);

  let filterOptions = [
    { field: "myRating", name: "I've Rated" },
    { field: "hasBreakfast", name: "Breakfast?" },
  ];

  if (state.user?.name) {
    filterOptions = [
      { field: "weightedRating", name: `${state.group.name}'s Rating` },
    ].concat(filterOptions);
  }

  const handleFilter = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <Space className="dropdown">
      <FilterOutlined style={iconStyle} />
      <Select
        mode="tags"
        maxTagCount={2}
        onChange={handleFilter}
        allowClear={true}
        placeholder="Filter Restaurants"
      >
        {filterOptions.map((option) => (
          <Select.Option key={option.field}>{option.name}</Select.Option>
        ))}
      </Select>
    </Space>
  );
}
