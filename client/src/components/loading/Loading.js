import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./loading.css";

/**
 * Wrap elements with loading screen and
 * set has loading
 * @param {Object} children content to display on load
 * @param {Boolean} loading state on whether page is loading
 */
const Loading = () => {
  return (
    <div className="loading">
      <LoadingOutlined />
    </div>
  );
};

export default Loading;
