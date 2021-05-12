import React, { Component } from "react";
import SignUpPresenter from "./SignUpPresenter";
import axios from "axios";

const AWS = "http://192.168.43.8:8080/cosmos/kStars/signUp";
  //"http://ec2-3-86-166-99.compute-1.amazonaws.com:8080/cosmos/kStars/signUp";

const LOCAL = "http://192.168.0.10:8080/cosmos/kStars/signUp";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      status: null,
    };
    this.updateCred = this.updateCred.bind(this);
    this.sendCred = this.sendCred.bind(this);
  }

  updateCred = (event, cred) => {
    this.setState({
      [cred]: event.target.value,
    });
  };

  // sendCred = (event) => {
  //   event.preventDefault();
  //   const { email, password, role } = this.state;
  //   axios
  //     .post(AWS, { email, password, role })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log("error", error.response);
  //       alert("모든 칸을 입력해주세요.");
  //     });
  // };

  sendCred = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const result = await axios.post(LOCAL, {
        email,
        password,
      });
      console.log("sign up result", result);
      this.setState({ status: result.status });
    } catch (error) {
      console.log("sign up error", error);
    }
  };

  render() {
    const { email, password, status } = this.state;
    const { sendCred, updateCred } = this;
    // console.log("Sign Up Creds", email, password, status);
    return (
      <SignUpPresenter
        creds={{
          email,
          password,
          status,
          sendCred,
          updateCred,
        }}
      />
    );
  }
}

export default SignUpContainer;
