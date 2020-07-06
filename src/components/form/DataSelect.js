import React from "react";
import { Space, Select } from "antd";

const { Option } = Select;

/**
 * @jaidharosenblatt Select field that allows user to use the select field with
 * an array of options (to be used in a form)
 * Refer to ant design Select field documentation for more details
 * @param {props} options the options for the form (values are same as what is displayed)
 * @param {props} name the value for the form
 * @param {props} label a vertical label for the field
 * @param {props} required whether or not this field is required
 * @param {props} message the error message for the field "Please input your name"
 * @param {props} name the value to be used in a form
 * @param {props} mode "tags" or "multiple" (default)
 * @param {props} placeholder placeholder in field
 * @param {props} onChange callback function for field change
 */
const DataSelect = (props) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <p>{props.label}</p>
      <Select
        style={{ width: "100%" }}
        placeholder={props.placeholder}
        onChange={props.onChange}
      >
        {props.options.map((option, index) => {
          return (
            <Option key={index} value={option}>
              {option}
            </Option>
          );
        })}
      </Select>
    </Space>
  );
};

export default DataSelect;
