import React from "react";
import { Card, Space } from "antd";
import { StarFilled, CarFilled, EnvironmentFilled } from "@ant-design/icons";

/**
 * Render a Restaurant into a card
 * Iterates through icons map to determine properties to display
 * @param {Restaurant} restaurant
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant }) => {
  // Map restaurant properties to an icon
  const icons = {
    duration: <CarFilled />,
    distance: <EnvironmentFilled />,
    rating: <StarFilled style={{ color: "#FFD203" }} />,
  };

  const fields = Object.keys(restaurant);
  return (
    <Card>
      <div className="card-header">
        <h1>{restaurant.name}</h1>
      </div>
      <Space>
        {fields.map((field, i) => {
          if (field in icons) {
            return (
              <Space size={2} key={i}>
                {icons[field]}
                <p>{restaurant[field]} </p>
              </Space>
            );
          }
          return null;
        })}
      </Space>
    </Card>
  );
};

export default RestaurantCard;
