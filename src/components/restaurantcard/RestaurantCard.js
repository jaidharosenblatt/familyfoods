import React from "react";
import { Card, Row, Col, Space } from "antd";
import Tags from "../tags/Tags";
import {
  StarFilled,
  StarOutlined,
  CarFilled,
  ClockCircleFilled,
} from "@ant-design/icons";

const attributeIconMap = {
  distance: <CarFilled />,
  type: <ClockCircleFilled />,
};

const StarName = ({ score, name, width, overall }) => {
  return (
    <Col xs={24} md={width} style={{ color: overall ? "#FFD203" : "#bfbfbf" }}>
      <Space size={2}>
        {overall ? <StarFilled /> : <StarOutlined />}
        <p>{score}</p>
        {name && <p>{name}</p>}
      </Space>
    </Col>
  );
};

const RestaurantCard = ({ loading, restaurant }) => {
  const people = ["Kaden", "Jaidha", "CJ", "Gid"];
  return (
    <Card loading={loading}>
      <div className="card-header">
        <Row>
          <Col span={12}>
            <h1>{restaurant.name}</h1>
            {restaurant.score && (
              <StarName
                color="#FFD203"
                width={6}
                score={restaurant["score"]}
                overall
              />
            )}
          </Col>
          <Col span={12} align="right">
            <Tags tags={restaurant.tags} />
          </Col>
        </Row>
      </div>
      <Space>
        {restaurant.price && (
          <p style={{ color: "#7AC289" }}>{restaurant.price}</p>
        )}
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
              key={person}
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
