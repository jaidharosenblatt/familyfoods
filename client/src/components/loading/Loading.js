import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./loading.css";

/**
 * Centered loading indicator
 * @returns {JSX}
 */
const Loading = () => {
  return (
    <div className="loading">
      <LoadingOutlined />
    </div>
  );
};

export default Loading;
