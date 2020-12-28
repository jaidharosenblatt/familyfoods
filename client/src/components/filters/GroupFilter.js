import React, { useContext } from "react";
import Context from "../../context/Context";
import GroupMembersAvatars from "../group/GroupMembersAvatars";
import GroupDropDown from "./GroupDropDown";
import TakeTurn from "./TakeTurn";

export default function GroupFilter({ iconStyle }) {
  const { state } = useContext(Context);
  if (!state.user) {
    return null;
  }

  return (
    <>
      <GroupDropDown iconStyle={iconStyle} />
      {state.group && (
        <GroupMembersAvatars numbers members={state.group.shiftedMembers} />
      )}
      <TakeTurn />
    </>
  );
}
