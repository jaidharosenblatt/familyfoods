import React from "react";
import { Radio, Form } from "antd";

export default function YesNoSegmentedControl({ name, label }) {
  const options = [
    { label: "Yes", value: true },
    { label: "Don't know", value: undefined },
    { label: "No", value: false },
  ];
  const buttonWidth = 100 / options.length + "%";
  return (
    <Form.Item name={name} label={label}>
      <Radio.Group
        block
        optionType="button"
        style={{ width: "100%", textAlign: "center" }}
      >
        {options.map((option, i) => (
          <Radio.Button
            key={i}
            style={{ width: buttonWidth }}
            value={option.value}
          >
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
}
