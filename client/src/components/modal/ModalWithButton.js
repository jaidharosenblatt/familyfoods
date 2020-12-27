import React, { useState } from "react";
import { Modal, Button } from "antd";

/**
 * Helper component for rendering a centered modal with a button
 * @param {String} buttonText text to display on button
 * @param {JSX} clickable action to trigger modal open
 * @param {Boolean} parentVisible pass visibility from parent
 * @param {Function} setParentVisible pass visibility callback from parent
 * @param {Array} children to render in modal
 * @param {Boolean} danger whether or not to make button red
 */
const ModalWithButton = (props) => {
  const [visible, setVisible] = useState(false);

  function update(status) {
    if (props.setParentVisible) {
      return props.setParentVisible(status);
    }
    setVisible(status);
  }

  return (
    <>
      {props.clickable ? (
        React.cloneElement(props.clickable, {
          onClick: () => update(true),
        })
      ) : (
        <Button danger={props.danger} block onClick={() => update(true)}>
          {props.buttonText}
        </Button>
      )}

      <Modal
        visible={
          props.parentVisible !== undefined ? props.parentVisible : visible
        }
        onClick={() => update(false)}
        onCancel={() => update(false)}
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
