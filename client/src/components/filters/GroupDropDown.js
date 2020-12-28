import React, { useContext } from "react";
import { Select } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import Context from "../../context/Context";
import { setGroup } from "../../context/actionCreators";
import API from "../../api/API";

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

  const handleGroupSelect = async (key) => {
    if (!key) {
      return dispatch(setGroup(undefined));
    }
    const group = await API.getGroup(key);
    dispatch(setGroup(group));
  };

  return (
    <div className="filter-dropdown">
      <TeamOutlined style={iconStyle} />
      <Select
        onChange={handleGroupSelect}
        value={state.group?._id}
        allowClear={true}
        placeholder="Sort by Group"
      >
        {state.user.groups.map((group, i) => (
          <Select.Option key={group._id} name={group.name}>
            {group.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
