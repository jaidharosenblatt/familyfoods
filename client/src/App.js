import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import reducer from "./context/reducer";
import Context from "./context/Context";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import NavBar from "./components/navbar/NavBar";
import MobileFooter from "./components/navbar/MobileFooter";
import SignIn from "./pages/SignIn";
import API from "./api/API";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    async function loadUser() {
      const user = await API.loadUser();
      dispatch(user);
    }

    loadUser();
  }, []);
  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <NavBar />
          <div className="navbar-container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/add" exact component={AddRestaurant} />
              <Route path="/signin" exact component={SignIn} />
            </Switch>
          </div>
          <MobileFooter />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
