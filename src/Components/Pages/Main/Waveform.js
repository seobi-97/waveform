import React from "react";
import ReactWaves, { Regions } from "@dschoon/react-waves";

export default class Waveform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      regionFlag: false,
      playing: false,
      wavesurfer: null,
      duration: 0,
      pos: 0,
      regions: {},
    };
  }

  onLoading = ({ wavesurfer, originalArgs = [] }) => {
    this.setState({
      loaded: originalArgs[0] === 100,
      wavesurfer,
    });
    this.state.wavesurfer.enableDragSelection({
      color: 'rgba('+[~~(Math.random()*255),
        ~~(Math.random()*255),
        ~~(Math.random()*255),
        this.state.d,
      ]+')',
      //color: "rgba(100, 149, 240, 0.3)",
    });
    this.state.wavesurfer.on("ready", () =>
      this.setState({ duration: wavesurfer.getDuration() })
    );
    this.state.wavesurfer.on("finish", () => {
      this.setState({ playing: false });
      // go back to the start point
      wavesurfer.skipBackward(this.state.duration);
    });
  };

  onPosChange = (pos, wavesurfer) => {
    this.setState({
      pos: wavesurfer.getCurrentTime(),
      wavesurfer,
    });
  };

  // Region
  secondsToPosition = (sec) => {
    return (1 / this.state.wavesurfer.getDuration()) * sec;
  };

  handleSingleRegionUpdate = (e) => {
    const newState = Object.assign(this.state, {
      regions: {
        [e.region.id]: e.region,
      },
    });
    this.setState(newState);
  };

  handleRegionClick = (e) => {
    setTimeout(() => {
      this.state.wavesurfer.seekTo(
        this.secondsToPosition(e.originalArgs[0].start)
      );
    }, 50);

    this.setState({ regionFlag: true });

    // 부모 컴포넌트 index로 값 넘기기
    this.props.onClick(
      e.originalArgs[0].start,
      e.originalArgs[0].end,
      this.state.wavesurfer
    );

  };

  handleRegionDone = (e) => {
    if (this.state.regionFlag) {
      // go back to the start point
      setTimeout(() => {
        this.state.wavesurfer.seekTo(
          this.secondsToPosition(e.originalArgs[0].start)
        );
      }, 50);
      //loop prevent
      this.setState({ playing: true }); //구간을 클릭한 상태일때 구간 반복재생
    }
  };

  // Zoom
  zoom = (direction) => {
    const { wavesurfer } = this.state;
    const currentZoom = wavesurfer.params.minPxPerSec;

    if (direction === "in") {
      wavesurfer.zoom(currentZoom + 10);
    } else if (direction === "out" && currentZoom > 1) {
      wavesurfer.zoom(currentZoom - 10);
    }
  };
  render() {
    const { duration, pos, wavesurfer } = this.state;
    return (
      <>
        <div className={"container example"}>
          <ReactWaves
            id="waveform"
            audioFile={
              "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3"
            }
            className={"react-waves"}
            options={{
              barGap: 2,
              barWidth: 1.8,
              barHeight: 2,
              cursorWidth: 2,
              cursorColor: "#202a66",
              height: 200,
              hideScrollbar: true,
              progressColor: "#EC407A",
              responsive: true,
              waveColor: "#D1D6DA",
            }}
            volume={1}
            zoom={1}
            pos={this.state.pos}
            playing={this.state.playing}
            onPosChange={this.onPosChange}
            onLoading={this.onLoading}
          >
            <Regions
              onSingleRegionUpdate={this.handleSingleRegionUpdate}
              onRegionClick={this.handleRegionClick}
              onRegionOut={this.handleRegionDone}
              regions={this.state.regions}
            />
          </ReactWaves>
          <div>
            {new Date(pos * 1000).toISOString().substr(11, 8)} /{" "}
            {new Date(duration * 1000).toISOString().substr(11, 8)}
          </div>
          <button
            className="play button"
            onClick={() => {
              this.setState({
                playing: !this.state.playing,
                regionFlag: false,
              });
              this.state.wavesurfer.on("audioprocess", () => {
                this.state.wavesurfer.setPlayEnd(
                  this.state.wavesurfer.getDuration()
                );
              });
            }}
          >
            {!this.state.playing ? "Whole PLAY ▶" : "PAUSE ⏸"}
          </button>

          {this.state.regionFlag ? (
            <button
              onClick={() => {
                this.setState({ playing: !this.state.playing });
              }}
            >
              {!this.state.playing ? "Region PLAY" : "Pause"}
            </button>
          ) : (
            <span></span>
          )}

          <br />
          <button
            className="clearRegions button"
            onClick={() => {
              wavesurfer.clearRegions();
              this.props.handleClearRegionPoints();
              this.setState({ regionFlag: false });
            }}
          >
            Clear All Regions
          </button>

          <div className="zoom-buttons">
            <button
              className="zoom-in button"
              onClick={this.zoom.bind(this, "in")}
            >
              {"➕️"} Zoom In
            </button>
            <button
              className="zoom-out button"
              onClick={this.zoom.bind(this, "out")}
            >
              {"➖️"} Zoom Out
            </button>
          </div>
        </div>
      </>
    );
  }
}
