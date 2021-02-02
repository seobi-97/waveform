import React, { Component } from "react";
import Router from "./Router";
import UserContext from "../Contexts/UserContext";
import { withCookies } from "react-cookie";

class App extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      userToken: cookies.get("JQeQHzzD") || null,
    };
    this.updateUserToken = this.updateUserToken.bind(this);
  }

  updateUserToken = (userToken) => {
    this.setState(
      {
        userToken,
      },
      () => this.props.cookies.set("JQeQHzzD", userToken)
    );
  };

  render() {
    const { userToken } = this.state;
    const { updateUserToken } = this;
    console.log("userToken in App", userToken);
    return (
      <UserContext.Provider value={userToken}>
        <Router user={{ userToken, updateUserToken }} />
      </UserContext.Provider>
    );
  }
}

export default withCookies(App);
