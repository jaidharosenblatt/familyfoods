import React, { useState } from "react";
import { Col, Button } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import useWeightedRestaurants from "../hooks/useWeightedRestaurants";

const RandomChooser = () => {
  const [order, setOrder] = useState(["kaden", "jaidha", "cj", "gid"]);
  // const [restaurants, setRestaurants] = useState([]);
  const [restaurants] = useWeightedRestaurants([
    "kaden",
    "jaidha",
    "cj",
    "gid",
  ]);

  //Shift order over by one
  const rotateOrder = () => {
    var rotatedArray = order;
    const x = order[order.length - 1];

    for (let i = order.length - 1; i > 0; i--) {
      rotatedArray[i] = rotatedArray[i - 1];
    }
    rotatedArray[0] = x;

    console.log(rotatedArray);
    setOrder(rotatedArray);
  };

  return (
    <Col>
      <p>{order}</p>
      <Button onClick={rotateOrder}>Hi</Button>

      {restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant.name} restaurant={restaurant} />;
      })}
    </Col>
  );
};

export default RandomChooser;
