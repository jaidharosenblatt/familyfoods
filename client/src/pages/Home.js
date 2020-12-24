import React, { useContext } from "react";
import "./pages.css";
import Restaurants from "../components/restaurants/Restaurants";
import Header from "../components/header/Header";
import Context from "../context/Context";
import SignedInHeader from "../components/header/SignedInHeader";

const Home = () => {
  const { state } = useContext(Context);
  return (
    <div>
      {state.user ? <SignedInHeader /> : <Header />}

      <div className="home-body">
        <Restaurants />
      </div>
    </div>
  );
};

export default Home;
