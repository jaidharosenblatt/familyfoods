import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import reducer from "./context/reducer";
import Context from "./context/Context";

import Home from "./pages/Home";
import AddRestaurant from "./pages/AddRestaurant";
import NavBar from "./components/navbar/NavBar";
import MobileFooter from "./components/navbar/MobileFooter";
import SignIn from "./pages/SignIn";
import API from "./api/API";
import { setUser, startLoading, stopLoading } from "./context/actionCreators";
import SignUp from "./pages/SignUp";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {});

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
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/add" exact component={AddRestaurant} />
              {!state.user ? (
                <>
                  <Route path="/signin" exact component={SignIn} />
                  <Route path="/signup" exact component={SignUp} />
                </>
              ) : (
                <Route
                  path={["/signin", "/signup"]}
                  exact
                  component={() => {
                    return <Redirect to={"/"} />;
                  }}
                />
              )}
            </Switch>
          </div>
          <MobileFooter />
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
