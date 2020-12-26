import React, { useContext } from "react";
import { Button } from "antd";
import useGeolocation from "../../hooks/useGeolocation";
import API from "../../api/API";
import Context from "../../context/Context";
import { startLoading, stopLoading } from "../../context/actionCreators";

/** Locate the current user and add their geolocation to their profile */
export default function UpdateLocation() {
  const [geolocation] = useGeolocation();
  const { state, dispatch } = useContext(Context);
  const updateLocation = async () => {
    dispatch(startLoading());
    await API.editProfile({ location: geolocation });
    dispatch(stopLoading());
  };
  if (!geolocation) {
    return null;
  }

  return (
    <Button disabled={state.loading} onClick={updateLocation}>
      Update Location
    </Button>
  );
}
