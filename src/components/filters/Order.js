import React from "react";
import { Button, Row, Col, Card, Space } from "antd";
import { SignalFilled } from "@ant-design/icons";

const WeightsChooser = ({ order, loading, handleClick }) => {
  return (
    <Card
      title={
        <Space>
          <SignalFilled />
          <p>Order</p>
        </Space>
      }
      extra={
        <Button disabled={loading} type="primary" onClick={handleClick}>
          Next in line!
        </Button>
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
    </Card>
  );
};

export default WeightsChooser;
