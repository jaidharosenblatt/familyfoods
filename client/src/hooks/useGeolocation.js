import { useState, useEffect } from "react";

/**
 * Get location of the current user
 * @returns {Location} matching backend model
 */
const useGeolocation = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const cords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setLocation(cords);
    });
  }, []);
  return [location];
};

export default useGeolocation;
