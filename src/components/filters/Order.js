import React from "react";
import { Button, Row, Col, Card, Space } from "antd";
import { SignalFilled } from "@ant-design/icons";
import CollapseCard from "./CollapseCard";
const WeightsChooser = ({ order, loading, handleClick }) => {
  return (
    <CollapseCard
      title={
        <Space>
          <SignalFilled />
          <p>Order</p>
        </Space>
      }
    >
      <Col span={24}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {order.map((item, index) => {
            return (
              <Row key={index} align="middle">
                <p> {`${index + 1}. ${item}`} </p>
              </Row>
            );
          })}
        </Space>
      </Col>
    </CollapseCard>
  );
};

export default WeightsChooser;
