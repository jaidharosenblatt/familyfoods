import React, { useState, useContext } from "react";
import { Button, Col, Space, Row } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import ModalWithButton from "../modal/ModalWithButton";
import Context from "../../context/Context";

/**
 * Helper component for displaying a confirm message
 * @param {Function} onClick
 * @param {String} CTA message on button
 * @param {String} message prompting for confirm
 * @param {Boolean} danger button red or not
 */
const ConfirmModal = ({ danger, onClick, CTA = "Confirm", message }) => {
  const [visible, setVisible] = useState(false);
  const { state } = useContext(Context);

  const confirm = async () => {
    await onClick();
    setVisible(false);
  };

  return (
    <ModalWithButton
      danger={danger}
      parentVisible={visible}
      setParentVisible={setVisible}
      buttonText={CTA}
    >
      <Col span={24} align="center">
        <h1>
          <ExclamationCircleFilled />
        </h1>
        {message}
        <Row gutter={4}>
          <Col span={12}>
            <Button
              danger={danger}
              onClick={confirm}
              loading={state.loading}
              type="primary"
              block
              htmlType="submit"
            >
              {CTA}
            </Button>
          </Col>
          <Col span={12}>
            <Button
              loading={state.loading}
              onClick={() => setVisible(false)}
              block
              htmlType="submit"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Col>
    </ModalWithButton>
  );
};
export default ConfirmModal;
