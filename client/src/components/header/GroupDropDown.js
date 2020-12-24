import React, { useContext } from "react";
import { Select, Space } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import Context from "../../context/Context";
import { setGroup } from "../../context/actionCreators";

/**
 * Render a dropdown with group options
 * Controls sort state in Context
 * @param {Style} iconStyle inline CSS for styling icon
 */
export default function GroupDropDown({ iconStyle }) {
  const { state, dispatch } = useContext(Context);

  if (!state.user || state.user.groups?.length === 0) {
    return null;
  }

  const handleGroupSelect = (key, atr) => {
    if (!key) {
      return dispatch(setGroup(undefined));
    }
    dispatch(setGroup({ _id: key, name: atr?.name }));
  };

  return (
    <Space>
      <TeamOutlined style={iconStyle} />
      <Select
        onChange={handleGroupSelect}
        value={state.group?._id}
        allowClear={true}
        placeholder="Select a group"
      >
        {state.user.groups.map((group, i) => (
          <Select.Option key={group._id} name={group.name}>
            {group.name}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
