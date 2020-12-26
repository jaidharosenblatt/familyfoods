import React from "react";
import { Radio, Form } from "antd";

/**
 * Radio buttons with buttons
 * Options are Yes, No, and Don't Know
 * @param {String} name field name
 * @param {String} label for above radio
 * @param {String} error to display in helpers
 */
export default function YesNoSegmentedControl({ name, label, error }) {
  const options = [
    { label: "Yes", value: true },
    { label: "Not Sure", value: undefined },
    { label: "No", value: false },
  ];
  const buttonWidth = 100 / options.length + "%";
  return (
    <Form.Item name={name} label={label}>
      <Radio.Group
        help={error}
        validateStatus={error ? "error" : "validating"}
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
