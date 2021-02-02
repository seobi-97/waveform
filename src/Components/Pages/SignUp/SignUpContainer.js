import React, { Component } from "react";
import SignUpPresenter from "./SignUpPresenter";
import axios from "axios";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: "",
    };
    this.updateCred = this.updateCred.bind(this);
    this.sendCred = this.sendCred.bind(this);
  }

  updateCred = (event, cred) => {
    this.setState({
      [cred]: event.target.value,
    });
  };

  sendCred = (event) => {
    event.preventDefault();
    const { email, password, role } = this.state;
    axios
      .post(
        "http://ec2-3-86-166-99.compute-1.amazonaws.com:8080/cosmos/kStars/signUp",
        { email, password, role }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error", error.response);
        alert("모든 칸을 입력해주세요.");
      });
  };

  render() {
    const { email, password, role } = this.state;
    const { sendCred, updateCred } = this;
    // console.log("Sign Up Creds", email, password, role, status);
    return (
      <SignUpPresenter
        creds={{
          email,
          password,
          role,
          sendCred,
          updateCred,
        }}
      />
    );
  }
}

export default SignUpContainer;
