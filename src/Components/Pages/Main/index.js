import React, { Component,createContext, useContext } from "react";
import Waveform from "./Waveform";
import TalkerForm from "./TalkerForm";
import TalkerItem from "./TalkerItem";
import Save from "./Save";
import DataContext from "../../../Contexts/DataContext";
import Connect from "./Connect";
const AppContext=createContext();

const Context = ({creds:{KSTProject,token,boards}}) => {
  const projData = useContext(DataContext);
  //let data='projData';
  const d=projData.data;
  KSTProject= {
    m_Audio: {
      audioCurrentPosition: 0,
      audioFileIndex: 0,
      audioPath: [
        localStorage.audioFile,
      ],

    },
    m_KTierMorpVer2: {
      dataType: "string",
      datas: [{
        morp: "string",
        speaker: "string",
        uid: "string",
        user: "string"
      }, ]
    },
    m_KTierVer2: {
      dataType: "",
      datas: [{
        speaker: boards[0].talker,
        text: boards[0].text,
        time: "",
        uid: 0
      }, ]
    },
    m_Option: {
      speakerList: [
        "string",
      ],
      stringOption: "string"
    },
    m_header: {
      arrID: [{
        age: d.IDAge,
        code: "string",
        corpus: "string",
        dateOfBirth: "string",
        edu: d.IDEdu,
        group: d.IDGroup,
        region: d.IDRegion,
        role: "string",
        ses: d.IDSES,
        sex: d.IDSex
      }],
      arrParticipants: [
        "string"
      ],
      birthOfCHI: "string",
      birthPlaceOfCHI: d.BirthPlace,
      comment: d.Comment,
      date: "string",
      language: "string",
      location: d.Location,
      media: "string",
      recording: "string",
      reviewer: d.Reviewer,
      situation: d.Situation,
      speechType: "string",
      transcriber: d.Transcriber
    },
    userDto: {
      fileName: d.projectName,//localStorage.projectName,
      id: "string",
      user: "user"
    },
    version: "string"
  };
  return <Connect KSTProject={KSTProject} token={token} boards={boards}/>;
  //return <div>{console.log(token)}</div>;
  //return <div>{console.log(projData)}</div>;
};

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
        },
      ],
      selectedBoard: {},
      start: null, // mp3/selected region start time
      end: null, // mp3/selected region end time
      wavesurfer: null,
      audioPlaying: false,
      result: [],
      token:this.props.user.userToken,
      KSTProject: null,
    };
    this.handleAudioPlay = this.handleAudioPlay.bind(this);
    this.handleSetRegionPoints = this.handleSetRegionPoints.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.handleClearRegionPoints = this.handleClearRegionPoints.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.updatetoken=this.updatetoken.bind(this);
  }
  updatetoken=(event,cred)=>{
    this.setState({
      [cred]:event.target.value,
    });
  };
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
      brdno: this.state.maxNo,
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
  handleResult = (Context,result) => {
    //const projData = useContext(DataContext);
    this.setState({
      result: result,
      //result:this.state.result.concat({projData,result}),
    });
  };
  render() {
    const { boards, selectedBoard, wavesurfer, result, KSTProject, token } = this.state;
    //const projData=Context();
    //console.log(projData);
    const {updatetoken}=this;
    console.log("userToken in Main", token);
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
        <Context creds={{KSTProject, token, boards}}/>
      </>
    );
  }
}

export default Main;
