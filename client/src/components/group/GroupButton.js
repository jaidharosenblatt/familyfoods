import React, { useContext } from "react";
import { Button, Space } from "antd";
import API from "../../api/API";
import Context from "../../context/Context";
import CreateEditGroup from "./CreateEditGroup";
import JoinGroupPassword from "./JoinGroupPassword";
import ConfirmModal from "../modal/ConfirmModal";

/**
 * Return the button(s) for group cards
 * @param {Group} group for this card
 * @param {Boolean} userInGroup
 */
const GroupButton = ({ group, userInGroup }) => {
  const { state } = useContext(Context);
  const lastPerson = group.members.length === 1;
  const deleteGroup = async () => {
    await API.deleteGroup(group._id);
    window.location.reload();
  };

  const joinGroup = async () => {
    await API.joinGroup(group._id);
    window.location.reload();
  };

  const DeleteButton = () => (
    <ConfirmModal
      message={`Are you sure you want to ${lastPerson ? "delete" : "leave"}?`}
      CTA={lastPerson ? "Delete Group" : "Leave Group"}
      onClick={deleteGroup}
      danger
    />
  );
  if (group.owner === state.user._id) {
    return (
      <Space>
        <CreateEditGroup group={group} />
        <DeleteButton />
      </Space>
    );
  }

  if (userInGroup) {
    return <DeleteButton />;
  }

  return group.public ? (
    <Button onClick={joinGroup} type="primary">
      Join Group
    </Button>
  ) : (
    <JoinGroupPassword group={group} />
  );
};

export default GroupButton;
