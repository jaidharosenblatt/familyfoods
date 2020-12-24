import React, { useContext } from "react";
import { Col, Card, Select } from "antd";
import LeftRightRow from "../left-right-row/LeftRightRow";
import "./header.css";
import Context from "../../context/Context";

const SignedInHeader = () => {
  const { state } = useContext(Context);
  console.log(state.user);

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
                allowClear={true}
                placeholder="Select a group"
                style={{ width: "100%", minWidth: 200 }}
              >
                {state.user.groups.map((group, i) => (
                  <Select.Option name={group._id} key={i}>
                    {group.name}
                  </Select.Option>
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
