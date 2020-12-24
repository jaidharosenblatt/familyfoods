import React, { useContext } from "react";
import { Col, Card, Select, Space } from "antd";
import { TeamOutlined } from "@ant-design/icons";

import LeftRightRow from "../left-right-row/LeftRightRow";
import Context from "../../context/Context";
import { setGroup } from "../../context/actionCreators";
import "./header.css";

const SignedInHeader = () => {
  const { state, dispatch } = useContext(Context);

  const handleGroupSelect = (key, atr) => {
    if (!key) {
      return dispatch(setGroup(undefined));
    }
    dispatch(setGroup({ _id: key, name: atr?.name }));
  };
  return (
    <div className="header">
      <Col span={24}>
        <Card>
          <LeftRightRow
            left={
              <>
                <h1>Restaurants</h1>
                <p>Find where you should eat</p>
              </>
            }
            right={
              <Space>
                <TeamOutlined style={{ color: "#BFBFBF", fontSize: 20 }} />
                <Select
                  onChange={handleGroupSelect}
                  value={state.group?._id}
                  allowClear={true}
                  placeholder="Select a group"
                  style={{ width: "100%", minWidth: 200 }}
                >
                  {state.user.groups.map((group, i) => (
                    <Select.Option key={group._id} name={group.name}>
                      {group.name}
                    </Select.Option>
                  ))}
                </Select>
              </Space>
            }
          />
        </Card>
      </Col>
      <div className="blur" />
    </div>
  );
};

export default SignedInHeader;
