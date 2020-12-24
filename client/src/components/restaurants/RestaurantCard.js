import React from "react";
import { Card, Space } from "antd";
import { StarFilled, CarFilled, EnvironmentFilled } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import LeftRightRow from "../left-right-row/LeftRightRow";

/**
 * Render a Restaurant into a card
 * Iterates through icons map to determine properties to display
 * @param {Restaurant} restaurant
 * @param {Boolean} hideCard render restaurant without the card and rating
 * @param {Function} makeReview callback to review this restaurant
 * @returns {JSX}
 */
const RestaurantCard = ({ restaurant, hideCard, makeReview }) => {
  // Map restaurant properties to an icon
  const icons = {
    duration: <CarFilled />,
    distance: <EnvironmentFilled />,
    rating: <StarFilled style={{ color: "#FFD203" }} />,
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
        !hideCard && (
          <StarRatings
            starDimension="30px"
            starHoverColor="#FFD203"
            starRatedColor="#FFD203"
            changeRating={(rating) => makeReview(restaurant._id, rating)}
            rating={restaurant.myRating || 0}
          />
        )
      }
    />
  );

  if (hideCard) {
    return cardContent;
  }

  return <Card>{cardContent}</Card>;
};

export default RestaurantCard;
