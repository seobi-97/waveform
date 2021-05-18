import React, { Component } from "react";
import HeaderPresenter from "./HeaderPresenter";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      IDCode: "", // 코드
      IDRole: "", // 역할
      
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
      maxNo:1,
      Roles:[
        {
          brdno:0,
          IDCode:"CHI",
          IDRole:"대상 아동",
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
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
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("project header state", this.state)
    );
  };
  handleGetData=(role)=>{
      this.setState({
        maxNo:this.state.maxNo+1,
        Roles:this.state.Roles.concat({
          brdno:this.state.maxNo,
          ...role,
        }),
      });
      console.log(this.state.Roles);
  }
  handleSubmit= async(e)=>{
    e.preventDefault();
    const {IDCode, IDRole}=this.state;
    let role={
      IDCode,
      IDRole,
    }
    this.handleGetData(role);
    this.setState({
      IDCode:"",
      IDRole:"",
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
 
  
  render() {
    const { Roles }=this.state;
    return (
      <>
      {Roles.map((role)=>(
        <HeaderPresenter
          key={role.brdno}
          role={role}
          state={this.state}
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          handleSubmit2={this.handleSubmit2}
        />
      ))}
      </>
    );
  }
}

export default HeaderContainer;
