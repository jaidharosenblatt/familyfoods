import React, { useEffect, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";

import reducer from "./context/reducer";
import Context from "./context/Context";

import NavBar from "./components/navbar/NavBar";
import MobileFooter from "./components/navbar/MobileFooter";
import API from "./api/API";
import { setUser, startLoading, stopLoading } from "./context/actionCreators";
import Routes from "./pages/Routes";
import axios from "axios";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    restaurants: [],
    filters: [],
    refreshRestaurants: true,
  });

  useEffect(() => {
    async function loadUser() {
      axios.defaults.withCredentials = true;

      const res = await axios.get("https://eat-together-us.herokuapp.com/test");
      console.log(res);
      const user = await API.loadUser();
      dispatch(setUser(user));
    }
    dispatch(startLoading());
    loadUser();
    dispatch(stopLoading());
  }, []);

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <NavBar />
          <div className="navbar-container">
            <Routes />
          </div>
          <MobileFooter />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
