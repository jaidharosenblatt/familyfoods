import React from "react";
import { Col, Row, Space, InputNumber } from "antd";
import { SettingFilled, EditFilled } from "@ant-design/icons";
import CollapseCard from "./CollapseCard";

const WeightsChooser = ({ order, initialWeights, onWeightChange }) => {
  return (
    <CollapseCard
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
              <Row key={index} align="middle">
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
    </CollapseCard>
  );
};

export default WeightsChooser;
