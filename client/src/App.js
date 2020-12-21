import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RandomChooser from "./pages/Weighted";
import AddRestaurant from "./pages/AddRestaurant";
import Restaurants from "./pages/Restaurants";
import NavBar from "./components/navbar/NavBar";
import MobileFooter from "./components/navbar/MobileFooter";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="navbar-container">
          <Switch>
            <Route path="/" exact component={RandomChooser} />
            {/* <Route path="/add" exact component={AddRestaurant} />
            <Route path="/all" exact component={Restaurants} /> */}
          </Switch>
        </div>
        <MobileFooter />
      </BrowserRouter>
    </div>
  );
};

export default App;
