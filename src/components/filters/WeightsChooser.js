import React from "react";
import { Button, Row, Col, Card, Space, InputNumber } from "antd";
import { SignalFilled, EditFilled } from "@ant-design/icons";
const WeightsChooser = ({
  order,
  initialWeights,
  onWeightChange,
  loading,
  handleClick,
}) => {
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
                <Col span={8}>
                  <p> {`${index + 1}. ${item}`} </p>
                </Col>
                <Col span={16} align="right">
                  <Space>
                    <EditFilled />

                    <InputNumber
                      defaultValue={initialWeights[index]}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={(value) => {
                        onWeightChange(value, index);
                      }}
                    />
                  </Space>
                </Col>
              </Row>
            );
          })}
        </Space>
      </Col>
    </Card>
  );
};

export default WeightsChooser;
