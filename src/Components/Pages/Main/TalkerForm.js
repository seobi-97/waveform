import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default class TalkerForm extends React.Component {
  state = {
    talker: "",
    text: "",
  };

  handleSelectRow = (row) => {
    this.setState(row);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let selectedBoard = this.props.selectedBoard;
    const { talker, text } = this.state;
    let data = {
      talker,
      text,
    };
    this.props.onSaveData(data, selectedBoard.brdno);
    this.setState({
      talker: "",
      text: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={3} item xs={12}>
          <Grid
            container
            item
            xs={3}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <TextField
              label="발화인"
              placeholder="발화인을 입력하세요"
              style={{ margin: 8, marginLeft: 120 }}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              name="talker"
              value={this.state.talker}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <div>
              <TextField
                label="전사할 내용 입력"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
            </div>
          </Grid>
          <Grid
            container
            item
            sm={1}
            direction="column"
            justify="flex-end"
            alignItems="center"
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ margin: 20, padding: 10 }}
            >
              입력
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
