import React, { useContext } from "react";
import { Col, Card, Select } from "antd";
import LeftRightRow from "../left-right-row/LeftRightRow";
import "./header.css";
import Context from "../../context/Context";
import { setGroup } from "../../context/actionCreators";

const SignedInHeader = () => {
  const { state, dispatch } = useContext(Context);

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
              <Select
                onChange={(key) => dispatch(setGroup(key))}
                allowClear={true}
                placeholder="Select a group"
                style={{ width: "100%", minWidth: 200 }}
              >
                {state.user.groups.map((group, i) => (
                  <Select.Option key={group._id}>{group.name}</Select.Option>
                ))}
              </Select>
            }
          />
        </Card>
      </Col>
      <div className="blur" />
    </div>
  );
};

export default SignedInHeader;
