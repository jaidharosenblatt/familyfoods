import React, { useContext } from "react";
import Context from "../../context/Context";
import GroupMembersAvatars from "../group/GroupMembersAvatars";
import GroupDropDown from "./GroupDropDown";
import TakeTurn from "./TakeTurn";

export default function GroupFilter({ iconStyle }) {
  const { state } = useContext(Context);
  return (
    <>
      <GroupDropDown iconStyle={iconStyle} />
      {state.group && (
        <GroupMembersAvatars members={state.group.shiftedMembers} />
      )}
      <TakeTurn />
    </>
  );
}
