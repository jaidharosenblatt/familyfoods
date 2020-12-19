import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

import "./filters.css";

const CollapseCard = (props) => {
  const [hidden, setHidden] = useState(true);
  return (
    <div>
      {hidden ? (
        <Card>
          <div className="card-header">
            <Row>
              <Col span={20}>{props.title}</Col>
              <Col
                span={4}
                style={{ cursor: "pointer" }}
                align="right"
                onClick={() => setHidden(!hidden)}
              >
                <UpOutlined />
              </Col>
            </Row>
          </div>
        </Card>
      ) : (
        <Card
          extra={
            <div
              className="card-header"
              style={{ cursor: "pointer" }}
              onClick={() => setHidden(!hidden)}
            >
              <DownOutlined />
            </div>
          }
          title={props.title}
        >
          {props.children}
        </Card>
      )}
    </div>
  );
};

export default CollapseCard;
