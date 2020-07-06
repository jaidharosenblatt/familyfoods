import React from "react";
import { Col, Row, Card, Space, InputNumber } from "antd";
import { SettingFilled, EditFilled } from "@ant-design/icons";

const WeightsChooser = ({ order, initialWeights, onWeightChange }) => {
  return (
    <Card
      title={
        <Space>
          <SettingFilled />
          <p>Weighting</p>
        </Space>
      }
    >
      <Col span={24}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {order.map((item, index) => {
            return (
              <Row align="middle">
                <Col span={14}>
                  <Space>
                    <EditFilled />
                    <p>{`Weight for position ${index + 1}`}</p>
                  </Space>
                </Col>
                <Col align="right" span={10}>
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
