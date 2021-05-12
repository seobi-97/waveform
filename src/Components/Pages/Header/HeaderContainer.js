import React, { Component } from "react";
import HeaderPresenter from "./HeaderPresenter";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // KSTProject: {
      //   m_Audio: {
      //     audioCurrentPosition: 0, //
      //     audioFileIndex: 0, //오디오 인덱스
      //     audioPath: [
      //       localStorage.audioFile,  //오디오 파일 경로
      //     ],

      //   },
      //   m_KTierMorpVer2: {
      //     dataType: "",
      //     datas: [{
      //       morp: "",
      //       speaker: "",
      //       uid: "",
      //       user: ""
      //     }, ]
      //   },
      //   m_KTierVer2: {
      //     //dataType: "",
      //     datas: [{
      //       //speaker: "",
      //       text: "",
      //       time: "",
      //       //uid: 0
      //     }, ]
      //   },
      //   m_Option: {
      //     speakerList: [ //(CHI,MOT,FAT 등)
      //       "",
      //     ],
      //     stringOption: "" //
      //   },
      //   m_header: {
      //     arrID: [{
      //       age: "", //연령
      //       code: "", //코드(CH1,ADU1)
      //       corpus: "", //??
      //       dateOfBirth: "", //생년월일
      //       edu: "", //학력
      //       group: "", //그룹(대도시,중소도시,농촌)
      //       region: "", //지역
      //       role: "", //구성원
      //       ses: "", //사회적 경제 지위
      //       sex: "" //성별
      //     }],
      //     arrParticipants: [ //참가자
      //       ""
      //     ],
      //     birthOfCHI: "",  //아동 생년월일
      //     birthPlaceOfCHI: "", //아동 출생지
      //     comment: "", //코멘트
      //     date: "", //날짜
      //     language: "", //언어
      //     location: "", //장소
      //     media: "", //??
      //     recording: "", //녹음 음질
      //     reviewer: "", //검토자
      //     situation: "", //상황
      //     speechType: "", //??
      //     transcriber: "" //전사자
      //   },
      //   userDto: {
      //     fileName: localStorage.projectName, //파일이름
      //     id: "", //유저 아이디
      //     user: "" //??
      //   },
      //   version: "" //버전
      // },
      SpeechType: "", // ??
      Participants: "", // ??
      BirthPlace: "", // 아동 출생지
      Location: "", // 장소
      Situation: "", // 상황
      Recording: "", // 녹음 음질
      Transcriber: "", // 전사자
      Reviewer: "", // 검토자
      Comment: "", // 코멘트
      IDCorpus: "", // ??
      IDDateOfBirth: "", // 출생일
      CHI: false,
      MOT: false,
      FAT: false,
    
      ChIDAge: "", // 연령
      ChIDSex: "", // 성별
      ChIDGroup: "", // 그룹
      ChIDRegion: "", // 지역
      ChIDSES: "", // 사회적 경제 지위
      ChIDEdu: "", // 학력

      MoIDAge: "", // 연령
      MoIDSex: "", // 성별
      MoIDGroup: "", // 그룹
      MoIDRegion: "", // 지역
      MoIDSES: "", // 사회적 경제 지위
      MoIDEdu: "", // 학력

      FaIDAge: "", // 연령
      FaIDSex: "", // 성별
      FaIDGroup: "", // 그룹
      FaIDRegion: "", // 지역
      FaIDSES: "", // 사회적 경제 지위
      FaIDEdu: "", // 학력

      IDCode: "", // 코드
      IDRole: "", // 역할
      Code:"",
      Role:"",
      
      addFlag: false,
      value:"",
      IDAge:"",
      IDSex:"",
      IDGroup:"",
      IDRegion:"",
      IDSES:"",
      IDEdu:"",

      board:[
        {
          value:"",
          IDAge:"",
          IDSex:"",
          IDGroup:"",
          IDRegion:"",
          IDSES:"",
          IDEdu:"",
        }
      ],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleSaveData=(data,value)=>{
    if(value){
      this.setState({
        board:this.state.board.map((row)=>
          value===row.value
          ?{
            value,
            ...data,
          }
          :row
        ),
        board:this.state.board.concat({value:this.state.value,...data})
      })
    }
  }
  handleChange = (e) => {
    const KSTProject=this.state.KSTProject;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("project header state", this.state)
    );
  };
  handleSubmit= async(e)=>{
    e.preventDefault();
    const {IDCode, IDRole}=this.state;
    this.setState({
      Code:IDCode,
      Role:IDRole,
    });
  }
  handleSubmit2= async(e) =>{
    e.preventDefault();
    let value = this.state.value;
    const {IDAge,
          IDSex,
          IDGroup,
          IDRegion,
          IDSES,
          IDEdu,}=this.state;
    let data = {
      IDAge,IDSex,IDGroup,IDRegion,IDSES,IDEdu,
    };
    this.handleSaveData(data,value);
    this.setState({});
  }
 
  handleFlag=()=>{
    this.setState({
      addFlag:true,
    });
  }
  render() {
    return (
      <HeaderPresenter 
        state={this.state}
        handleSaveData={this.handleSaveData}
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
        handleSubmit2={this.handleSubmit2}
        handleFlag={this.handleFlag} 
      />
    );
  }
}

export default HeaderContainer;
