import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import API from "../api/API";
import RestaurantCard from "../components/restaurants/RestaurantCard";

/**
 * Form for adding a restaurant to the DB
 * @returns {JSX}
 */
const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState();
  const [error, setError] = useState();

  const onFinish = async (values) => {
    if (!values.search) {
      return setError("Please input a name");
    }
    try {
      const res = await API.createRestaurant(values.search);
      setRestaurant(res);
      setError(undefined);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          validateStatus={error ? "error" : "validating"}
          help={error}
          name="search"
          label="Name of restaurant"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Add restaurant
          </Button>
        </Form.Item>
      </Form>

      {restaurant && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <h1>New restaurant! </h1>
          <RestaurantCard restaurant={restaurant} />
        </Space>
      )}
    </div>
  );
};

export default AddRestaurant;
