import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";
import StarRatings from "react-star-ratings";
import Context from "../../context/Context";
import API from "../../api/API";
import { setRestaurants } from "../../context/actionCreators";
import useWindowDimensions from "../../hooks/useWindowDimensions";

/**
 * Render the ratings for a restaurant and the current group
 * @param {Restaurant} restaurant
 * @returns {JSX}
 */
export default function Ratings({ restaurant }) {
  const { state, dispatch } = useContext(Context);
  const { width } = useWindowDimensions();
  // Medium width from antd
  const md = width > 768;
  const makeReview = async (rating) => {
    await API.createReview(restaurant._id, rating);
    const updatedRestaurants = state.restaurants.map((r) => {
      return r._id === restaurant._id ? { ...r, myRating: rating } : r;
    });
    dispatch(setRestaurants(updatedRestaurants));
  };

  const starSize = md ? "30px" : "15px";

  return (
    <div>
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
    </div>
  );
}
