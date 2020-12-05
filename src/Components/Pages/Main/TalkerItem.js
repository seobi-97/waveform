import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
        >
          {this.props.row.regionStart ? (
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: 20, padding: 10 }}
              onClick={() => {
                const {
                  handleAudioPlay,
                  audioPlaying,
                  row,
                  wavesurfer,
                } = this.props;

                // go back to the start point when it's clickced
                wavesurfer.seekTo(
                  (1 / wavesurfer.getDuration()) * row.regionStart
                );

                wavesurfer.play();

                wavesurfer.on("audioprocess", () => {
                  wavesurfer.play();
                  wavesurfer.setPlayEnd(row.regionEnd);
                  // console.log("cur", wavesurfer.getCurrentTime());
                });

                console.log(wavesurfer.regions.list);

                // wavesurfer.clearRegions();

                // loop
                // wavesurfer.on("pause", () => {
                //   wavesurfer.play();
                // });

                // console.log(`${row.brdno}번 구간 시작 : ${row.regionStart}`);
                // console.log(`${row.brdno}번 구간 끝 : ${row.regionEnd}`);
                // console.log("wavesurfer : ", wavesurfer);
              }}
            >
              ▶{/* {this.props.wavesurfer.isPlaying() ? "Play" : "Pause"} */}
            </Button>
          ) : (
            <span />
          )}
        </Grid>
        {/* 삭제, 편집, 분석상세보기 버튼 end */}
      </Grid>
    );
  }
}

export default TalkerItem;
