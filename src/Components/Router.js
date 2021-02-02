import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthRoute from "../Routes/AuthRoute";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Main from "./Pages/Main";

const Router = ({ user }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/waveform" exact>
        {!user.userToken ? (
          <Login updateUserToken={user.updateUserToken} />
        ) : (
          <Redirect to="/waveform/main" />
        )}
      </Route>
      <Route path="/waveform/signup" exact component={SignUp} />
      <AuthRoute path="/waveform/main" isAuthed={user.userToken ? true : false}>
        <Main user={user} />
      </AuthRoute>
    </Switch>
  </BrowserRouter>
);

export default Router;
