import React, { Component } from "react";
import { WaveformContianer, Wave, Button } from "./Formstyle.js";
import WaveSurfer from "wavesurfer.js";
import Region from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";

class MediaPlayback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      selection: false,
      duration: 0,
      currentTime: 0,
      startTime: 5,
      endTime: 8,
    };
  }

  componentDidMount() {
    const track = document.querySelector("#track");

    this.wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: "#waveform",
      backend: "MediaElement",
      height: 80,
      progressColor: "#3B8686",
      waveColor: "#A8DBA8",
      cursorColor: "#4avi74a5",
      plugins: [Region.create()],
    });

    this.wavesurfer.load(track);
    // this.wavesurfer.enableDragSelection({});
    this.wavesurfer.on("finish", () => this.setState({ playing: false }));
    this.wavesurfer.on("error", function (e) {
      console.warn(e);
    });
  }

  getCurrentTime = () => {
    this.setState({
      currentTime: (this.duration = this.wavesurfer.getCurrentTime()),
    });
  };

  handlePlay = () => {
    this.setState({
      playing: !this.state.playing,
      duration: (this.duration = this.wavesurfer.getDuration()),
    });
    this.wavesurfer.playPause();
    this.wavesurfer.on("audioprocess", this.getCurrentTime);
  };

  PlayRegions = () => {
    this.setState({
      duration: (this.duration = this.wavesurfer.getDuration()),
    });
    this.wavesurfer.play(this.state.startTime, this.state.endTime);
    this.wavesurfer.on("audioprocess", this.getCurrentTime);
  };

  render() {
    const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

    return (
      <WaveformContianer>
        <Wave id="waveform" />
        <audio id="track" src={url} />
        <div>Total Time : {this.state.duration}s</div>
        <div>Current Time : {this.state.currentTime}s</div>
        <Button onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </Button>
        <Button>구간 선택하기</Button>
        <Button onClick={this.PlayRegions}>선택 구간 재생</Button>
        <div>구간 시작 : {this.state.startTime}s</div>
        <div>구간 끝 : {this.state.endTime}s</div>
      </WaveformContianer>
    );
  }
}

export default MediaPlayback;
