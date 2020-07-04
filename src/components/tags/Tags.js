import React from "react";
import { Tag } from "antd";

const COLORS = [
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
];

const COLORS_MAP = {
  Breakfast: "green",
  Dinner: "cyan",
  Expensive: "magenta",
  "Long Wait": "volcano",
  "Short Wait": "purple",
};

const Tags = ({ tags = [] }) => {
  return (
    <>
      {tags.map((tag) => {
        var randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

        var color = randomColor;
        if (tag in COLORS_MAP) {
          color = COLORS_MAP[tag];
        }
        return (
          <Tag key={tag} color={color}>
            {tag}
          </Tag>
        );
      })}
    </>
  );
};

export default Tags;
