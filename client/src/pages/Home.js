import React from "react";
import "./pages.css";
import Restaurants from "../components/restaurants/Restaurants";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <div>
      <Header
        h1="Weighted Restaurants"
        p="The only way that everyone (kinda) gets what they want "
      />

      <div className="home-body">
        <Restaurants />
      </div>
    </div>
  );
};

export default Home;
