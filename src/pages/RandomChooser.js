import React, { useState, useEffect } from "react";
import { Col, Button, List } from "antd";
import RestaurantCard from "../components/restaurantcard/RestaurantCard";
import getWeightedRestaurants from "../hooks/getWeightedRestaurants";
import useRestaurants from "../hooks/useRestaurants";

const RandomChooser = () => {
  const [order, setOrder] = useState(["kaden", "jaidha", "cj", "gid"]);
  const [sortedRestaurants, setSortedRestaurants] = useState([]);
  const [restaurants] = useRestaurants();

  useEffect(() => {
    const res = getWeightedRestaurants(restaurants, order);
    setSortedRestaurants(res);
    console.log(res);
  }, [restaurants, order]);

  //Shift order over by one
  const rotateOrder = () => {
    var rotatedArray = [...order];
    const x = order[order.length - 1];

    for (let i = order.length - 1; i > 0; i--) {
      rotatedArray[i] = rotatedArray[i - 1];
    }

    rotatedArray[0] = x;
    return rotatedArray;
  };

  return (
    <div className="chooser">
      <Col>
        <Button onClick={() => setOrder(rotateOrder())}>Hi</Button>

        <List>
          {order.map((item, index) => {
            return (
              <List.Item key={item}>
                <List.Item.Meta
                  title={<p>{`Preference ${index}`}</p>}
                  description={
                    <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                  }
                />
              </List.Item>
            );
          })}
        </List>

        {sortedRestaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          );
        })}
      </Col>
    </div>
  );
};

export default RandomChooser;
