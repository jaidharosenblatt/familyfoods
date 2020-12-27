import React, { useContext } from "react";
import { Select } from "antd";
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
    { field: "breakfast", name: "Breakfast" },
    { field: "dinner", name: "Dinner" },
    { field: "takeout", name: "Takeout" },
    { field: "outdoorSeating", name: "Outdoor Seating" },
  ];

  // Add user ratings filters to front if user
  if (state.user) {
    filterOptions = [
      { field: "rating", name: "Have Rated" },
      { field: "noRating", name: "Haven't Rated" },
    ].concat(filterOptions);
  }

  const handleFilter = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <div className="filter-dropdown">
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
    </div>
  );
}
