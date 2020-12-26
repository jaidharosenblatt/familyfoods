import React, { useContext, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import API from "../api/API";
import CenteredCard from "../components/centered-card/CenteredCard";
import Context from "../context/Context";
import { setError, refreshRestaurants } from "../context/actionCreators";
import RestaurantDetailsForm from "../components/restaurants/RestaurantDetailsForm";

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
      const res = await API.createRestaurant(values.search);
      setRestaurant(res);
      dispatch(refreshRestaurants());
    } catch (e) {
      dispatch(setError(e));
    }
  };

  return (
    <CenteredCard>
      {restaurant ? (
        <RestaurantDetailsForm
          setRestaurant={setRestaurant}
          restaurant={restaurant}
        />
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
                Search
              </Button>
            </Form.Item>
          </Form>
        </Space>
      )}
    </CenteredCard>
  );
};

export default AddRestaurant;
