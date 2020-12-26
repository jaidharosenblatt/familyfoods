import { Form, Space, Button, Col, Row } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/API";
import { refreshRestaurants } from "../../context/actionCreators";
import Context from "../../context/Context";
import YesNoSegmentedControl from "../form/YesNoSegmentedControl";
import RestaurantCardDetails from "./RestaurantCardDetails";
import "./restaurants.css";

/**
 * Edit the details for a restaurant
 * @param {Restaurant} restaurant
 * @param {Function} setRestaurant
 */
export default function RestaurantDetailsForm({ restaurant, setRestaurant }) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const { dispatch } = useContext(Context);
  const { name } = restaurant;
  const clearRestaurant = () => setRestaurant(undefined);

  const handleSubmit = async (changes) => {
    try {
      const res = await API.editRestaurant(restaurant._id, changes);
      setRestaurant(res);
      setSuccess(true);
      dispatch(refreshRestaurants());
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Space className="add-details-form" direction="vertical">
      <RestaurantCardDetails restaurant={restaurant} />
      {!success && (
        <h3>
          Not what you were looking for? Try searching again{" "}
          <span className="fake-link" onClick={clearRestaurant}>
            here
          </span>
        </h3>
      )}
      {success ? (
        <Row gutter={4} style={{ minWidth: 200 }}>
          <Col span={12}>
            <Button type="primary" onClick={clearRestaurant} block>
              Add Another
            </Button>
          </Col>
          <Col span={12}>
            <Link to="/">
              <Button onClick={clearRestaurant} block>
                View All
              </Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <Form
          initialValues={restaurant}
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
            error={error}
            label={`Is ${name} open for breakfast/brunch?`}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Restaurant!
            </Button>
          </Form.Item>
        </Form>
      )}
    </Space>
  );
}
