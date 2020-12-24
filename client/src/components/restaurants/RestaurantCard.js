import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Space } from "antd";
import StarRatings from "react-star-ratings";
import Context from "../../context/Context";
import API from "../../api/API";
import { setRestaurants } from "../../context/actionCreators";
import RestaurantCardDetails from "./RestaurantCardDetails";
import useWindowDimensions from "../../hooks/useWindowDimensions";

/**
 * Render a Restaurant into a card
 * Iterates through icons map to determine properties to display
 * @param {Restaurant} restaurant
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant }) => {
  const { width } = useWindowDimensions();

  const { state, dispatch } = useContext(Context);

  const makeReview = async (rating) => {
    await API.createReview(restaurant._id, rating);
    const updatedRestaurants = state.restaurants.map((r) => {
      return r._id === restaurant._id ? { ...r, myRating: rating } : r;
    });
    dispatch(setRestaurants(updatedRestaurants));
  };

  // Medium width from antd
  const md = width > 768;
  // react-star-ratings doesn't allow CSS styling
  const starSize = md ? "30px" : "15px";

  return (
    <Card>
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
          {state.user ? (
            <Space direction="vertical">
              <Space>
                Your Rating
                <StarRatings
                  starDimension={starSize}
                  starHoverColor="#FFD203"
                  starRatedColor="#FFD203"
                  changeRating={makeReview}
                  rating={restaurant.myRating || 0}
                />
              </Space>
              {state.group && (
                <Space>
                  {`${state.group.name}'s Rating`}
                  <StarRatings
                    starDimension={starSize}
                    rating={restaurant.weightedRating || 0}
                  />
                </Space>
              )}
            </Space>
          ) : (
            <p>
              <Link to="/signup">Create </Link> an account to make reviews
            </p>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default RestaurantCard;
