import React, { useState } from "react";
import { Button } from "antd";
import useGeolocation from "../../hooks/useGeolocation";
import API from "../../api/API";

/** Locate the current user and add their geolocation to their profile */
export default function UpdateLocation() {
  const [geolocation] = useGeolocation();
  const [loading, setLoading] = useState();

  const updateLocation = async () => {
    setLoading(true);
    await API.editProfile({ location: geolocation });
    setTimeout(() => setLoading(false), 1000);
  };
  if (!geolocation) {
    return null;
  }

  return (
    <Button loading={loading} onClick={updateLocation}>
      Update Location
    </Button>
  );
}
