import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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

const LoginPresenter = ({
  creds: { email, password, sendCred, updateCred },
}) => {
  const classes = useStyles;
  return (
    <Container style={{ marginTop: 150 }} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h2" align="center">
          KSTARS
        </Typography>
        {/* 로그인 폼 */}
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
          >
            Sign In
          </Button>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password
              </Link>
            </Grid>
            <Grid item>
              <Link to="/waveform/signup" variant="body2">
                {"Create an account"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Link to={"/waveform/main"}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            style={{ marginTop: 30 }}
          >
            {"GUEST로 이용하기"}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default LoginPresenter;
