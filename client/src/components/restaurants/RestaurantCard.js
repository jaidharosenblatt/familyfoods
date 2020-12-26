import React, { useContext } from "react";
import { Card, Row, Col } from "antd";

import RestaurantCardDetails from "./RestaurantCardDetails";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Ratings from "./Ratings";
import Context from "../../context/Context";

/**
 * Render a Restaurant into a card
 * @param {Restaurant} restaurant
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant }) => {
  const { state } = useContext(Context);
  const { width } = useWindowDimensions();
  // Medium width from antd
  const md = width > 768;
  // react-star-ratings doesn't allow CSS styling

  return (
    <Card loading={state.loading}>
      <Row>
        <Col xs={24} md={12}>
          <RestaurantCardDetails restaurant={restaurant} />
        </Col>
        <Col
          xs={24}
          md={12}
          align={md ? "right" : "left"}
          style={!md && { marginTop: 8, marginBottom: 8 }}
        >
          <Ratings restaurant={restaurant} />
        </Col>
      </Row>
    </Card>
  );
};

export default RestaurantCard;
