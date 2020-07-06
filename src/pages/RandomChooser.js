import React, { useState, useEffect } from "react";
import { Col, Spin, Button, Row, Space, InputNumber, Form } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import getWeightedRestaurants from "../hooks/getWeightedRestaurants";
import useRestaurants from "../hooks/useRestaurants";
import "./pages.css";
import DataSelect from "../components/form/DataSelect";
import SubmitButton from "../components/form/SubmitButton";
import { FilterFilled } from "@ant-design/icons";
import FilterCard from "../components/filters/FilterCard";

const RandomChooser = () => {
  const [filters, setFilters] = useState({
    type: "All",
    price: "All",
    distance: "All",
  });
  const initialWeights = [60, 20, 10, 10];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [weights, setWeights] = useState(initialWeights);
  const [order, setOrder] = useState(["Kaden", "Jaidha", "CJ", "Gid"]);
  const [sortedRestaurants, setSortedRestaurants] = useState({
    all: [],
    col1: [],
    col2: [],
  });

  const [restaurants] = useRestaurants();

  useEffect(() => {
    calc();
    setLoading(false);
    // eslint-disable-next-line
  }, [restaurants, weights, order, filters]);

  const onWeightChange = (value, index) => {
    setLoading(true);

    var newWeights = weights;
    newWeights[index] = value;
    let sum = 0;
    weights.forEach((weight) => {
      sum += weight;
    });
    if (sum !== 100) {
      setError("Please create a total that adds up to 100");
    } else {
      setError("");
    }
    setWeights(newWeights);

    setTimeout(function() {
      calc();

      setLoading(false);
    }, 700);
  };

  const handleClick = () => {
    setLoading(true);
    setOrder(rotateOrder());
    calc();
    setTimeout(function() {
      setLoading(false);
    }, 700);
  };

  function calc() {
    const res = getWeightedRestaurants(restaurants, order, weights, filters);
    var temp1 = [];
    var temp2 = [];

    res.forEach((element, index) => {
      if (index % 2 === 0) temp1.push(element);
      else temp2.push(element);
    });
    setSortedRestaurants({ all: res, col1: temp1, col2: temp2 });
  }

  const RenderCard = ({ restaurants }) => {
    return (
      <>
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard
              loading={loading}
              key={restaurant.name}
              restaurant={restaurant}
            />
          );
        })}
      </>
    );
  };

  //Shift order over by one
  const rotateOrder = () => {
    var rotatedArray = [...order];
    const x = order[order.length - 1];

    for (let i = order.length - 1; i > 0; i--) {
      rotatedArray[i] = rotatedArray[i - 1];
    }

    rotatedArray[0] = x;
    return rotatedArray;
  };

  return (
    <div className="chooser-container">
      <div className="chooser">
        <Space size={16} style={{ width: "100%" }} direction="vertical">
          <Row>
            <Col span={14}>
              <h1>Random Restaurants</h1>
              <p>Click below to change who has the greatest preference</p>
              <Button disabled={loading} type="primary" onClick={handleClick}>
                Next in line!
              </Button>
            </Col>
          </Row>

          <FilterCard filters={filters} setFilters={setFilters} />
          <Row gutter={8}>
            {order.map((item, index) => {
              return (
                <Col span={24 / order.length} key={index}>
                  <b> {`${index + 1}. ${item}`} </b>
                  <br />
                  <Space>
                    <p>Weight </p>
                    <InputNumber
                      defaultValue={initialWeights[index]}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={(value) => {
                        onWeightChange(value, index);
                      }}
                    />
                  </Space>
                </Col>
              );
            })}
          </Row>
          {error !== "" && <p style={{ color: "#EF4138" }}> {error}</p>}
          {sortedRestaurants.all.length === 0 && (
            <Row align="center">
              <Spin size="large" />
            </Row>
          )}
          <Row gutter={8}>
            <Col xs={24} md={0}>
              <RenderCard restaurants={sortedRestaurants.all} />
            </Col>
            <Col xs={0} md={12}>
              <RenderCard restaurants={sortedRestaurants.col1} />
            </Col>
            <Col xs={0} md={12}>
              <RenderCard restaurants={sortedRestaurants.col2} />
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default RandomChooser;
