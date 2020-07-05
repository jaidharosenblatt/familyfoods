import React from "react";
import { Card, Row, Col, Space } from "antd";
import Tags from "../tags/Tags";
import { StarFilled, CarFilled, ClockCircleFilled } from "@ant-design/icons";

const attributeIconMap = {
  distance: <CarFilled />,
  type: <ClockCircleFilled />,
};

const StarName = ({ score, name, width, color }) => {
  return (
    <Col span={width} style={{ color: color }}>
      <Space size={2}>
        <StarFilled />
        <p>{score}</p>
        {name && <p>{name}</p>}
      </Space>
    </Col>
  );
};

const RestaurantCard = ({ restaurant }) => {
  const people = ["Kaden", "Jaidha", "CJ", "Gid"];
  return (
    <Card
      extra={<Tags tags={restaurant.tags} />}
      title={
        <Space>
          <p>{restaurant.name}</p>
          <p style={{ color: "#7AC289" }}>{restaurant.price}</p>
        </Space>
      }
    >
      <Space>
        <StarName color="#FFD203" width={6} score={restaurant["score"]} />

        {restaurant.distance && (
          <Space>
            {attributeIconMap["distance"]}
            <p>{restaurant.distance} </p>
          </Space>
        )}
        {restaurant.type && (
          <Space>
            {attributeIconMap["type"]}
            <p>{restaurant.type.join(", ")} </p>
          </Space>
        )}
      </Space>
      <Row gutter={4}>
        {people.map((person) => {
          return (
            <StarName
              color="#bfbfbf"
              width={24 / people.length}
              score={restaurant[person]}
              name={person}
            />
          );
        })}
      </Row>
    </Card>
  );
};

export default RestaurantCard;
