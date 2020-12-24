import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";
import { StarFilled, CarFilled, EnvironmentFilled } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import Context from "../../context/Context";
import API from "../../api/API";
import LeftRightRow from "../left-right-row/LeftRightRow";
import { setRestaurants } from "../../context/actionCreators";

/**
 * Render a Restaurant into a card
 * Iterates through icons map to determine properties to display
 * @param {Restaurant} restaurant
 * @param {Boolean} hideCard render restaurant without the card and rating
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant, hideCard }) => {
  const { state, dispatch } = useContext(Context);

  // Map restaurant properties to an icon
  const icons = {
    duration: <CarFilled />,
    distance: <EnvironmentFilled />,
    rating: <StarFilled style={{ color: "#FFD203" }} />,
  };

  const makeReview = async (rating) => {
    await API.createReview(restaurant._id, rating);
    const updatedRestaurants = state.restaurants.map((r) => {
      return r._id === restaurant._id ? { ...r, myRating: rating } : r;
    });
    dispatch(setRestaurants(updatedRestaurants));
  };

  const fields = Object.keys(restaurant);
  const cardContent = (
    <LeftRightRow
      left={
        <>
          <div className="card-header">
            <h2>{restaurant.name}</h2>
          </div>
          <Space>
            {fields.map((field, i) => {
              if (field in icons) {
                return (
                  <Space size={2} key={i}>
                    {icons[field]}
                    <p>{restaurant[field]} </p>
                  </Space>
                );
              }
              return null;
            })}
          </Space>
        </>
      }
      right={
        !hideCard &&
        (state.user ? (
          <StarRatings
            starDimension="30px"
            starHoverColor="#FFD203"
            starRatedColor="#FFD203"
            changeRating={makeReview}
            rating={restaurant.myRating || 0}
          />
        ) : (
          <p>
            <Link to="/signup">Create </Link> an account to make reviews
          </p>
        ))
      }
    />
  );

  if (hideCard) {
    return cardContent;
  }

  return <Card>{cardContent}</Card>;
};

export default RestaurantCard;
