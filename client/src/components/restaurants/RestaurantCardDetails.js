import React from "react";
import { Space } from "antd";
import {
  StarFilled,
  CarFilled,
  EnvironmentFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function RestaurantCardDetails({ restaurant }) {
  const colors = { green: { color: "#198038" }, red: { color: "#D93025" } };
  // Map restaurant properties to an icon
  const icons = {
    duration: <CarFilled />,
    distance: <EnvironmentFilled />,
    rating: <StarFilled style={{ color: "#FFD203" }} />,
  };
  const booleans = {
    hasDinner: "Dinner",
    hasBreakfast: "Breakfast",
    hasOutdoorSeating: "Outdoor Seating",
    hasTakeout: "Takeout",
  };

  const fields = Object.keys(restaurant);

  return (
    <Space direction="vertical">
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
          if (field === "price_level") {
            return (
              <p key={i} style={colors.green}>
                {"$".repeat(restaurant[field])}{" "}
              </p>
            );
          }

          return null;
        })}
      </Space>
      <Space>
        {fields.map((field, i) => {
          if (field in booleans) {
            return (
              <Space size={2} key={i}>
                {restaurant[field] ? (
                  <CheckOutlined style={colors.green} />
                ) : (
                  <CloseOutlined style={colors.red} />
                )}
                <p>{booleans[field]} </p>
              </Space>
            );
          }

          return null;
        })}
      </Space>
    </Space>
  );
}
