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
  };

  handleGetData = (data, brdno) => {
    if (!brdno) {
      // Insert
      this.setState({
        maxNo: this.state.maxNo + 1,
        boards: this.state.boards.concat({ brdno: this.state.maxNo, ...data }),
        selectedBoard: {},
      });
      console.log("Insert 완료");
    } else {
      // Update
      this.setState({
        boards: this.state.boards.map((row) =>
          brdno === row.brdno ? { brdno: brdno, ...data } : row
        ),
        selectedBoard: {},
      });
      console.log("update 완료");
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

  render() {
    const { boards, selectedBoard } = this.state;

    return (
      <>
        <Waveform />

        {/* 입력창 */}
        <TalkerForm
          onSaveData={this.handleGetData}
          selectedBoard={selectedBoard}
        />
        {console.log(boards)}

        {/* 전사창 */}
        {boards.map((row) => (
          <TalkerItem
            key={row.brdno}
            row={row}
            onRemove={this.handleRemove}
            onSelectRow={this.handleSelectRow}
          />
        ))}
      </>
    );
  }
}

export default Main;
