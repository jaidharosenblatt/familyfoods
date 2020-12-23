import React, { useContext, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import API from "../api/API";
import RestaurantCard from "../components/restaurants/RestaurantCard";
import CenteredCard from "../components/centered-card/CenteredCard";
import Context from "../context/Context";
import { clearError, startLoading, setError } from "../context/actionCreators";

/**
 * Form for adding a restaurant to the DB
 * @returns {JSX}
 */
const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState();
  const { state, dispatch } = useContext(Context);

  const onFinish = async (values) => {
    if (!values.search) {
      return dispatch(setError("Please input a name"));
    }

    try {
      dispatch(startLoading());
      const res = await API.createRestaurant(values.search);
      setRestaurant(res);
      dispatch(clearError());
    } catch (e) {
      dispatch(setError(e));
    }
  };

  return (
    <CenteredCard>
      {restaurant ? (
        <Space direction="vertical" style={{ width: "100vh", maxWidth: 450 }}>
          <h1>New restaurant! </h1>
          <RestaurantCard hideCard restaurant={restaurant} />
          <Button type="primary" block onClick={() => setRestaurant(undefined)}>
            Add another restaurant
          </Button>
        </Space>
      ) : (
        <Space direction="vertical">
          <h1>Add a new restaurant</h1>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              validateStatus={state.error ? "error" : "validating"}
              help={state.error}
              name="search"
              label="Name of restaurant"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                loading={state.loading}
                type="primary"
                block
                htmlType="submit"
              >
                Add restaurant
              </Button>
            </Form.Item>
          </Form>
        </Space>
      )}
    </CenteredCard>
  );
};

export default AddRestaurant;
