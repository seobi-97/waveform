import React, { Component } from "react";
import Waveform from "./Waveform";
import TalkerForm from "./TalkerForm";
import TalkerItem from "./TalkerItem";

class Main extends Component {
  state = {
    maxNo: 1,
    boards: [
      {
        brdno: 0,
        talker: "코스모스",
        text: "코스모스는 가을에 피어요.",
        // analysisType: "morpAPI",
        // analysisResult: "",
      },
    ],
    selectedBoard: {},
    start: null, // mp3/selected region start time
    end: null, // mp3/selected region end time
    wavesurfer: null,
    audioPlaying: false,
  };

  handleAudioPlay = (bool) => {
    this.setState({ audioPlaying: bool });
  };

  // 자식 컴포넌트 waveform에서 받아온 값
  handleSetRegionPoints = (start = null, end = null, wavesurfer = null) => {
    this.setState({ start, end, wavesurfer });
    console.log(`선택 구간 시작 : ${start}s / 선택 구간 끝 : ${end}s`);
  };

  handleGetData = (data, brdno) => {
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

  render() {
    const { boards, selectedBoard, wavesurfer } = this.state;

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
      </>
    );
  }
}

export default Main;
