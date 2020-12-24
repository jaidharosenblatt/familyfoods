import React from "react";
import { Space } from "antd";
import { StarFilled, CarFilled, EnvironmentFilled } from "@ant-design/icons";

export default function RestaurantCardDetails({ restaurant }) {
  // Map restaurant properties to an icon
  const icons = {
    duration: <CarFilled />,
    distance: <EnvironmentFilled />,
    rating: <StarFilled style={{ color: "#FFD203" }} />,
  };
  const fields = Object.keys(restaurant);

  return (
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
}
