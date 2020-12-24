import React, { useEffect, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";

import reducer from "./context/reducer";
import Context from "./context/Context";

import NavBar from "./components/navbar/NavBar";
import MobileFooter from "./components/navbar/MobileFooter";
import API from "./api/API";
import { setUser, startLoading, stopLoading } from "./context/actionCreators";
import Routes from "./pages/Routes";

const App = () => {
  const [state, dispatch] = useReducer(reducer, { restaurants: [] });

  useEffect(() => {
    async function loadUser() {
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
