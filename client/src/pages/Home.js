import React from "react";
import "./pages.css";
import Restaurants from "../components/restaurants/Restaurants";
import SignedInHeader from "../components/header/Header";

const Home = () => {
  return (
    <div>
      <SignedInHeader />
      <div className="home-body">
        <Restaurants />
      </div>
    </div>
  );
};

export default Home;
