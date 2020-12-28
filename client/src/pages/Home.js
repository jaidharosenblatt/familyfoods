import React from "react";
import Restaurants from "../components/restaurants/Restaurants";
import FilterPane from "../components/filters/FilterPane";
import FilterPaneModal from "../components/filters/FilterPaneModal";
import "./pages.css";

const Home = () => {
  return (
    <div className="home">
      <div className="floating-pane">
        <h1>Restaurants</h1>
        <p>Find where you should eat</p>
        <FilterPane />
      </div>

      <div className="items">
        <FilterPaneModal />
        <Restaurants />
      </div>
    </div>
  );
};

export default Home;
