import React, { Component } from "react";
import Waveform from "./Waveform";
import TalkerForm from "./TalkerForm";
import TalkerItem from "./TalkerItem";
import Save from "./Save";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNo: 1,
      boards: [
        {
          brdno: 0,
          talker: "코스모스",
          text: "코스모스는 가을에 피어요.",
          analysisType: "morpAPI",
          analysisResult: "",
        },
      ],
      selectedBoard: {},
      start: null, // mp3/selected region start time
      end: null, // mp3/selected region end time
      wavesurfer: null,
      audioPlaying: false,
      result: [],
    };
    this.handleAudioPlay = this.handleAudioPlay.bind(this);
    this.handleSetRegionPoints = this.handleSetRegionPoints.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.handleClearRegionPoints = this.handleClearRegionPoints.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  handleAudioPlay = (bool) => {
    this.setState({ audioPlaying: bool });
  };

  // 자식 컴포넌트 waveform에서 받아온 값
  handleSetRegionPoints = (start = null, end = null, wavesurfer = null) => {
    this.setState({ start, end, wavesurfer });
    console.log(`클릭 구간 시작 : ${start}s / 클릭 구간 끝 : ${end}s`);
  };

  handleGetData = (data, brdno) => {
    this.state.result = this.state.result.concat({
      brdnp: this.state.maxNo,
      ...data,
    });
    if (!brdno) {
      // Insert
      this.setState({
        maxNo: this.state.maxNo + 1,
        boards: this.state.boards.concat({
          brdno: this.state.maxNo,
          ...data,
          regionStart: this.state.start,
          regionEnd: this.state.end,
        }),
        selectedBoard: {},
      });
    } else {
      // Update
      this.setState({
        boards: this.state.boards.map((row) =>
          brdno === row.brdno
            ? {
                brdno,
                ...data,
                regionStart: this.state.start,
                regionEnd: this.state.end,
              }
            : row
        ),
        selectedBoard: {},
      });
    }
  };

  handleRemove = (brdno) => {
    if (brdno !== 0)
      this.setState({
        boards: this.state.boards.filter((row) => row.brdno !== brdno),
      });
  };

  handleSelectRow = (row) => {
    this.setState({ selectedBoard: row });
  };

  handleClearRegionPoints = () => {
    this.setState({ start: null, end: null }, () =>
      console.log(this.state.start, this.state.end)
    );
    console.log("Clear Region start&end points");
  };
  handleResult = (result) => {
    this.setState({
      result: result,
    });
  };
  render() {
    const { boards, selectedBoard, wavesurfer, result } = this.state;
    console.log("userToken in Main", this.props.user.userToken);
    return (
      <>
        <Waveform
          onClick={this.handleSetRegionPoints}
          handleAudioPlay={this.handleAudioPlay}
          audioPlaying={this.state.audioPlaying}
          handleClearRegionPoints={this.handleClearRegionPoints}
        />

        {/* 입력창 */}
        <TalkerForm
          onSaveData={this.handleGetData}
          selectedBoard={selectedBoard}
        />

        {/* 전사창 */}
        {boards.map((row) => (
          <TalkerItem
            key={row.brdno}
            row={row}
            onRemove={this.handleRemove}
            onSelectRow={this.handleSelectRow}
            handleAudioPlay={this.handleAudioPlay}
            audioPlaying={this.state.audioPlaying}
            handleSetRegionPoints={this.handleSetRegionPoints}
            wavesurfer={wavesurfer}
          />
        ))}
        {console.log("boards", boards)}
        <Save handleResult={this.handleResult} result={result} />
      </>
    );
  }
}

export default Main;
