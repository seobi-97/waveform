import React, { Component , useContext} from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  //스타일
  layout: {},
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  guest: {
    marginTop: 50,
  },
}));
class Connect extends Component{
  constructor(props){
    super(props);
    this.state={
      KSTProject:this.props.KSTProject,
      token:this.props.token,
    }
    this.sendCred=this.sendCred.bind(this);
  };

sendCred = (event) => {
  event.preventDefault();
  const { KSTProject, token } = this.state;
  //this.state.token="eyJ0eXAiOiJKV1QiLCJpc3N1ZURhdGUiOjE2MjA4MTMzMDM4NzgsImFsZyI6IkhTMjU2In0.eyJFTUFJTCI6InV1dUBuYXZlci5jb20iLCJleHAiOjE2MjExNzMzMDN9.7kD95x3u2OrtAqMvwipz6oRgQ19vI2Ot5OytGlyDu-w";
  console.log(KSTProject);
  console.log(token);
  axios
    .post("http://192.168.0.10:8080/cosmos/kStars/create/kst/user",
          KSTProject,{headers: {
            "Content-type": "application/json",
            "token": token,
        },} )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log("error", error.response);
    });
};
render(){
  const classes = useStyles;
  const {sendCred}=this;
  return(
    <div>
      <form className={classes.form} noValidate onSubmit={sendCred}>
          <button type="submit">서버 연동 테스트</button>
        </form>
    </div>
  )
}
}
export default Connect;