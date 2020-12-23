import React, { useState } from "react";
import { Modal, Button } from "antd";

/**
 * Helper component for rendering a centered modal with a button
 * @param {String} buttonText text to display on button
 * @param {Array} children to render in modal
 */
const ModalWithButton = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button block onClick={() => setVisible(true)}>
        {props.buttonText}
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        centered={true}
        footer={null}
        closable={false}
        width={300}
        height="auto"
      >
        {props.children}
      </Modal>
    </>
  );
};
export default ModalWithButton;
