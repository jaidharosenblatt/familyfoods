import React from "react";
import { Card } from "antd";
import "./filters.css";

const CollapseCard = (props) => {
  return (
    <div>
      {true ? (
        <Card>
          <div className="card-header" style={{ margin: 0 }}>
            {props.title}
          </div>
        </Card>
      ) : (
        <Card title={props.title}>{props.children}</Card>
      )}
    </div>
  );
};

export default CollapseCard;
