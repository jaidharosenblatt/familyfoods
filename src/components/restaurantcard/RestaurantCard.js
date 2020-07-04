import React from "react";
import { Card } from "antd";
import Tags from "../tags/Tags";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card extra={<Tags tags={restaurant.tags} />} title={restaurant.name}>
      hi
    </Card>
  );
};

export default RestaurantCard;
