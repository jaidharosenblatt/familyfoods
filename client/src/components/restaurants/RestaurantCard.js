import React from "react";
import { Card, Space } from "antd";
import { StarFilled, CarFilled, EnvironmentFilled } from "@ant-design/icons";

/**
 * Render a Restaurant into a card
 * Iterates through icons map to determine properties to display
 * @param {Restaurant} restaurant
 * @param {Boolean} hideCard render restaurant without the card
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant, hideCard }) => {
  // Map restaurant properties to an icon
  const icons = {
    duration: <CarFilled />,
    distance: <EnvironmentFilled />,
    rating: <StarFilled style={{ color: "#FFD203" }} />,
  };

  const fields = Object.keys(restaurant);
  const cardContent = (
    <>
      <div className="card-header">
        <h2>{restaurant.name}</h2>
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
    </>
  );

  if (hideCard) {
    return cardContent;
  }

  return <Card>{cardContent}</Card>;
};

export default RestaurantCard;
