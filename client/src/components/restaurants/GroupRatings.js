import { Space } from "antd";
import React from "react";
import { StarFilled } from "@ant-design/icons";

export default function GroupRatings({ restaurant }) {
  return (
    <Space>
      {restaurant.groupRatings.map((rating, i) => (
        <Space size={2} key={i}>
          <StarFilled style={{ color: "#FFD203" }} />

          <p key={i}>{`${rating.rating.toFixed(1)} ${rating.name}`}</p>
        </Space>
      ))}
    </Space>
  );
}
