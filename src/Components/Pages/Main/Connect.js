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
      boards:this.props.boards,
    }
    this.sendCred=this.sendCred.bind(this);
  };

sendCred = (event) => {
  event.preventDefault();
  const { KSTProject, token } = this.state;
  console.log(KSTProject);
  console.log(token);
  axios
    .post("http://ec2-3-86-166-99.compute-1.amazonaws.com:8080/cosmos/kStars/create/kst/user",
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