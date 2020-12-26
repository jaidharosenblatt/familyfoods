import React from "react";
import { Space } from "antd";
import {
  StarFilled,
  CarFilled,
  EnvironmentFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import GroupRatings from "./GroupRatings";

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
  const booleanFields = [];
  const iconFields = [];
  fields.forEach((field) => {
    if (field in booleans) {
      booleanFields.push(field);
    } else if (field in icons || field === "price_level") {
      iconFields.push(field);
    }
  });

  return (
    <Space direction="vertical">
      <div className="card-header">
        <h2>{restaurant.name}</h2>
      </div>
      <Space>
        {iconFields.map((field, i) => {
          if (field === "price_level") {
            return (
              <p key={i} style={colors.green}>
                {"$".repeat(restaurant[field])}{" "}
              </p>
            );
          }

          return (
            <Space size={2} key={i}>
              {icons[field]}
              <p>{restaurant[field]} </p>
            </Space>
          );
        })}
      </Space>
      {booleanFields.length !== 0 && (
        <Space>
          {booleanFields.map((field, i) => {
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
          })}
        </Space>
      )}

      <GroupRatings restaurant={restaurant} />
    </Space>
  );
}
