import React from "react";
import { Card, Row, Col, Space } from "antd";
import Tags from "../tags/Tags";
import { StarFilled, CarFilled, ClockCircleFilled } from "@ant-design/icons";

const attributeIconMap = {
  score: <StarFilled style={{ color: "#FFD203" }} />,
  distance: <CarFilled />,
  type: <ClockCircleFilled />,
};

const StarName = ({ score, name, width, align }) => {
  return (
    <Col span={width} align={align}>
      <Space size={2}>
        <b>{score}</b>
        {attributeIconMap["score"]}
        <p>{`${name} `}</p>
      </Space>
    </Col>
  );
};

const RestaurantCard = ({ restaurant }) => {
  const people = ["Kaden", "Jaidha", "CJ", "Gid"];
  return (
    <Card
      extra={<Tags tags={restaurant.tags} />}
      title={<p>{restaurant.name}</p>}
    >
      <Row gutter={8}>
        <StarName width={6} score={restaurant["score"]} name="Overall" />
        {people.map((person) => {
          return (
            <StarName
              align="right"
              width={4}
              score={restaurant[person]}
              name={person}
            />
          );
        })}
      </Row>
      <p>{restaurant.name} </p>
    </Card>
  );
};

export default RestaurantCard;
