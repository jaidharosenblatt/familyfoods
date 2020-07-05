import React from "react";
import { Card } from "antd";
import Tags from "../tags/Tags";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card
      extra={<Tags tags={restaurant.tags} />}
      title={
        <div>
          <p>{restaurant.name}</p>
          <p>{restaurant.price}</p>
        </div>
      }
    >
      {restaurant.score && <p> {`Score: ${restaurant.score}`}</p>}
    </Card>
  );
};

export default RestaurantCard;
