import React, { useContext } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./spinner.css";
import Context from "../../context/Context";

/**
 * Wrap elements with loading screen and
 * set has loading
 * @param {Object} children content to display on load
 * @param {Boolean} loading state on whether page is loading
 */
const Loading = (props) => {
  const { state } = useContext(Context);
  return (
    <>
      {state.loading ? (
        <div className="spinner">
          <LoadingOutlined />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default Loading;
