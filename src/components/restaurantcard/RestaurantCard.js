import React from "react";
import { Card } from "antd";
import Tags from "../tags/Tags";
import { StarFilled, CarFilled, ClockCircleFilled } from "@ant-design/icons";

const attributeIconMap = {
  score: <StarFilled />,
  distance: <CarFilled />,
  type: <ClockCircleFilled />,
};

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card
      extra={<Tags tags={restaurant.tags} />}
      title={<p>{restaurant.name}</p>}
    >
      <p>{restaurant.name} </p>
    </Card>
  );
};

export default RestaurantCard;
