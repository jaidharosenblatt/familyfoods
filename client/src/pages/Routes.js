import React, { useContext, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import SignUp from "./SignUp";
import EditProfile from "./EditProfile";
import SignIn from "./SignIn";
import Home from "./Home";
import AddRestaurant from "./AddRestaurant";
import Context from "../context/Context";
import { clearError } from "../context/actionCreators";

const Routes = () => {
  const location = useLocation();
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/add" exact component={AddRestaurant} />
      {!state.user ? (
        <>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </>
      ) : (
        <>
          <Route path="/profile" exact component={EditProfile} />
          <Route
            path={["/signin", "/signup"]}
            exact
            component={() => {
              return <Redirect to={"/"} />;
            }}
          />
        </>
      )}
    </Switch>
  );
};

export default Routes;
