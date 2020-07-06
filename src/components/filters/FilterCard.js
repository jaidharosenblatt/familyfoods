import React from "react";
import { Form, Card, Space } from "antd";
import DataSelect from "../form/DataSelect";
import SubmitButton from "../form/SubmitButton";
import { FilterFilled } from "@ant-design/icons";

const FilterCard = ({ filters, setFilters }) => {
  return (
    <Form
      initialValues={filters}
      layout="vertical"
      onFinish={(values) => setFilters(values)}
    >
      <Card
        title={
          <Space>
            <FilterFilled />
            <p>Filters</p>
          </Space>
        }
        extra={<SubmitButton CTA="Filter!" />}
      >
        <DataSelect
          name="type"
          label="Category"
          options={["All", "Breakfast", "Dinner", "Takeout"]}
        />
        <DataSelect
          label="Price"
          name="price"
          options={["All", "$", "$$", "$$$"]}
        />
        <DataSelect
          label="Distance"
          name="distance"
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
    </Form>
  );
};

export default FilterCard;
