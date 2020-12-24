import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";
import StarRatings from "react-star-ratings";
import Context from "../../context/Context";
import API from "../../api/API";
import LeftRightRow from "../left-right-row/LeftRightRow";
import { setRestaurants } from "../../context/actionCreators";
import RestaurantCardDetails from "./RestaurantCardDetails";

/**
 * Render a Restaurant into a card
 * Iterates through icons map to determine properties to display
 * @param {Restaurant} restaurant
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant }) => {
  const { state, dispatch } = useContext(Context);

  const makeReview = async (rating) => {
    await API.createReview(restaurant._id, rating);
    const updatedRestaurants = state.restaurants.map((r) => {
      return r._id === restaurant._id ? { ...r, myRating: rating } : r;
    });
    dispatch(setRestaurants(updatedRestaurants));
  };

  return (
    <Card>
      <LeftRightRow
        left={<RestaurantCardDetails restaurant={restaurant} />}
        right={
          state.user ? (
            <Space direction="vertical" align="end">
              <Space>
                Your Rating
                <StarRatings
                  starDimension="30px"
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
                    starDimension="30px"
                    rating={restaurant.weightedRating || 0}
                  />
                </Space>
              )}
            </Space>
          ) : (
            <p>
              <Link to="/signup">Create </Link> an account to make reviews
            </p>
          )
        }
      />
    </Card>
  );
};

export default RestaurantCard;
