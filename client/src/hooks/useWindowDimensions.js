import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  // antd mobile breakpoint
  const md = width > 768;

  return {
    width,
    height,
    md,
  };
}

/**
 * Get the width and height of the video port
 */
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
