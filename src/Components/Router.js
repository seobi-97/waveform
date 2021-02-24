import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthRoute from "../Routes/AuthRoute";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import ProjectStart from "./Pages/ProjectStart";

const Router = ({ user }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/waveform" exact>
        {!user.userToken ? (
          <Login updateUserToken={user.updateUserToken} />
        ) : (
          <Redirect to="/waveform/start/project" />
        )}
      </Route>
      <Route path="/waveform/signup" exact component={SignUp} />
      <AuthRoute
        path="/waveform/start/project"
        isAuthed={user.userToken ? true : false}
      >
        <ProjectStart user={user} />
      </AuthRoute>
      <AuthRoute path="/waveform/main" isAuthed={user.userToken ? true : false}>
        <Main user={user} />
      </AuthRoute>
      <Redirect from="*" to="/waveform" />
    </Switch>
  </BrowserRouter>
);

export default Router;
