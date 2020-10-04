import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";

class TalkerItem extends Component {
  handleSelectRow = () => {
    const { row, onSelectRow } = this.props;
    onSelectRow(row);
  };

  handleRemove = () => {
    const { row, onRemove } = this.props;
    onRemove(row.brdno);
  };

  render() {
    const { row } = this.props;
    return (
      <Grid container spacing={1} item sm={12}>
        {/* 행번호, 발화인, 분석태그 start */}
        <Grid
          container
          item
          sm={1}
          direction="column"
          justify="space-between"
          alignItems="flex-start"
        >
          <Typography style={{ marginTop: 25, marginLeft: 20 }}>
            {row.brdno}
          </Typography>
        </Grid>

        <Grid
          container
          item
          sm={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <TextField
            id="standard-read-only-input"
            label="발화인"
            value={row.talker}
            style={{ margin: 8, marginLeft: 20 }}
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            onClick={this.handleSelectRow}
          />

          <Typography variant="h6" style={{ marginTop: 5, marginLeft: 80 }}>
            {row.analysisType}
          </Typography>
        </Grid>
        {/* 행번호, 발화인, 분석태그 end */}

        {/* 발화내용 start */}
        <Grid container item sm={8}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <TextField
              id="outlined-full-width"
              label="발화내용"
              value={row.text}
              style={{ margin: 8 }}
              margin="normal"
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
              onClick={this.handleSelectRow}
            />
          </Grid>
        </Grid>
        {/* 발화내용 end */}

        {/* 삭제, 분석상세보기 버튼 start */}
        <Grid
          item
          sm={1}
          container
          direction="column"
          justify="flex-end"
          alignItems="center"
        ></Grid>
        {/* 삭제, 분석상세보기 버튼 end */}
      </Grid>
    );
  }
}

export default TalkerItem;
