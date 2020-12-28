import React from "react";
import { Card, Row, Col } from "antd";

import RestaurantCardDetails from "./RestaurantCardDetails";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Ratings from "./Ratings";

/**
 * Render a Restaurant into a card
 * @param {Restaurant} restaurant
 * @param {Boolean} loading from parent
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant, loading }) => {
  // react-star-ratings doesn't allow CSS styling
  const { md } = useWindowDimensions();

  return (
    <Card loading={loading}>
      <Row align="middle">
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
