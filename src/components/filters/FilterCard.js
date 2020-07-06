import React from "react";
import { Card, Space } from "antd";
import DataSelect from "../form/DataSelect";
import { FilterFilled } from "@ant-design/icons";

const FilterCard = ({ filters, setFilters }) => {
  const handleChange = (attribute, value) => {
    var newFilters = { ...filters };
    newFilters[attribute] = value;
    setFilters(newFilters);
  };

  return (
    <Card
      title={
        <Space>
          <FilterFilled />
          <p>Filters</p>
        </Space>
      }
    >
      <DataSelect
        onChange={(value) => {
          handleChange("type", value);
        }}
        name="type"
        label="Category"
        options={["All", "Breakfast", "Dinner", "Takeout"]}
      />
      <DataSelect
        onChange={(value) => {
          handleChange("price", value);
        }}
        label="Price"
        name="price"
        options={["All", "$", "$$", "$$$"]}
      />
      <DataSelect
        onChange={(value) => {
          handleChange("distance", value);
        }}
        label="Distance"
        options={[
          "All",
          "0-5 mins",
          "5-10 mins",
          "10-15 mins",
          "15-20 mins",
          "20+ mins",
        ]}
      />
    </Card>
  );
};

export default FilterCard;
