import React from "react";
import { Col, Card, Space, InputNumber } from "antd";
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
              <Space>
                <EditFilled />
                <p>{index + 1}</p>

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
            );
          })}
        </Space>
      </Col>
    </Card>
  );
};

export default WeightsChooser;
