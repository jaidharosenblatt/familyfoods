import { Form, Button } from "antd";
import React from "react";

/**
 * Button linked to form
 * @param CTA the call to action on the submit button
 */
const SubmitButton = ({ CTA }) => (
  <Form.Item>
    <Button htmlType="submit">{CTA}</Button>
  </Form.Item>
);

export default SubmitButton;
