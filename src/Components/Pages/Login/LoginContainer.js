import React, { Component } from "react";
import LoginPresenter from "./LoginPresenter";
import axios from "axios";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;

    // axios({
    //   method: "post",
    //   url: "ec2-3-86-166-99.compute-1.amazonaws.com:8080/cosmos/kStars/signUp",
    //   data: { email, password, role: "mom" },
    // })
    axios
      .post(
        "http://ec2-3-86-166-99.compute-1.amazonaws.com:8080/cosmos/kStars/signIn",
        { email, password }
      )
      .then((res) => {
        console.log(res);
        this.props.updateUserToken(res.data);
      })
      .catch((error) => {
        console.log("error", error.response);
        alert("틀린 이메일 혹은 비밀번호입니다.");
      });
  };

  render() {
    const { email, password } = this.state;
    // console.log("Login Creds", email, password);
    const { sendCred, updateCred } = this;
    return (
      <LoginPresenter
        creds={{
          email,
          password,
          sendCred,
          updateCred,
        }}
      />
    );
  }
}

export default LoginContainer;
