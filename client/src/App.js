import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RandomChooser from "./pages/Weighted";
import AddRestaurant from "./pages/AddRestaurant";
import Restaurants from "./pages/Restaurants";
import NavBar from "./components/navbar/NavBar";
import MobileFooter from "./components/navbar/MobileFooter";
import SignIn from "./pages/SignIn";
import ContextProvider from "./context/ContextProvider";

const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <NavBar />
          <div className="navbar-container">
            <Switch>
              {/* <Route path="/" exact component={RandomChooser} /> */}
              <Route path="/add" exact component={AddRestaurant} />
              <Route path="/all" exact component={Restaurants} />
              <Route path="/signin" exact component={SignIn} />
            </Switch>
          </div>
          <MobileFooter />
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
};

export default App;
