import React, { useState } from "react";
import { Button } from "antd";

import FilterCard from "./FilterCard";
import "./filters.css";
const FiltersPanel = () => {
  const [filters, setFilters] = useState({
    type: "All",
    price: "All",
    distance: "All",
  });
  return (
    <div className="filters-panel">
      <FilterCard filters={filters} setFilters={setFilters} />

      <div className="button-wrapper">
        <Button block type="primary">
          Next in line!
        </Button>
      </div>
    </div>
  );
};

export default FiltersPanel;
