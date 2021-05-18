import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
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

const SignUpPresenter = ({
  creds: { email, password, status, sendCred, updateCred },
}) => {
  const classes = useStyles;
  const history = useHistory();
  const goBack = (status) => {
    if (status === 201) history.push("/waveform");
    else alert("회원가입에 실패하였습니다.");
  };

  return (
    <Container style={{ marginTop: 150 }} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h3" align="center">
          KSTARS 회원가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={sendCred}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(event) => updateCred(event, "email")}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => updateCred(event, "password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={() => goBack(status)}
          >
            Sign Up
          </Button>  
          {/* {email && password ? (
            <Link to={"/waveform"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Link>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          )} */}
        </form>
        <Link to={"/waveform"}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
          >
            {"Login 페이지 이동"}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default SignUpPresenter;
