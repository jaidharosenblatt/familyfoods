import { Form, Space, Button } from "antd";
import React from "react";
import YesNoSegmentedControl from "../form/YesNoSegmentedControl";
import RestaurantCardDetails from "./RestaurantCardDetails";
import "./restaurants.css";

/**
 * Edit the details for a restaurant
 * @param {Restaurant} restaurant
 * @param {Function} setRestaurant
 * @param {Boolean} edit if restaurant is being edited
 */
export default function RestaurantDetailsForm({
  restaurant,
  setRestaurant,
  edit,
}) {
  const { name } = restaurant;
  const clearRestaurant = () => setRestaurant(undefined);

  const handleSubmit = (values) => {
    console.log(values);
    if (!edit) clearRestaurant();
  };

  return (
    <Space className="add-details-form" direction="vertical">
      <RestaurantCardDetails restaurant={restaurant} />
      {!edit &
      (
        <h3>
          Not what you were looking for? Try searching again{" "}
          <span className="fake-link" onClick={clearRestaurant}>
            here
          </span>
        </h3>
      )}
      <Form
        initialValues={{ hasOutdoorSeating: true }}
        onFinish={handleSubmit}
        layout="vertical"
        colon={false}
      >
        <YesNoSegmentedControl
          name="hasOutdoorSeating"
          label={`Does ${name} have outdoor dining?`}
        />
        <YesNoSegmentedControl
          name="hasTakeout"
          label={`Does ${name} have takeout?`}
        />
        <YesNoSegmentedControl
          name="hasDinner"
          label={`Is ${name} open for dinner?`}
        />
        <YesNoSegmentedControl
          name="hasBreakfast"
          label={`Is ${name} open for breakfast/brunch?`}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Restaurant!
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}
