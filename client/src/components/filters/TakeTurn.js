import React, { useContext } from "react";
import { Button } from "antd";
import Context from "../../context/Context";
import API from "../../api/API";
import { refreshRestaurants, setGroup } from "../../context/actionCreators";

export default function TakeTurn() {
  const { state, dispatch } = useContext(Context);

  const takeTurn = async () => {
    const res = await API.takeTurn(state.group._id);
    dispatch(refreshRestaurants());
    dispatch(setGroup(res));
  };

  if (!state.group) {
    return null;
  }
  return (
    <Button onClick={takeTurn} block type="primary">
      Rotate Order
    </Button>
  );
}
