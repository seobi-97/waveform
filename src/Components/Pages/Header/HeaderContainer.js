import React, { Component } from "react";
import HeaderPresenter from "./HeaderPresenter";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speechType: "", // ??
      participants: "", // ??
      birthPlace: "", // 아동 출생지
      place: "", // 장소
      situation: "", // 상황
      recordingQuality: "", // 녹음 음질
      transcriber: "", // 전사자
      reviewer: "", // 검토자
      comment: "", // 코멘트
      idCorpus: "", // ??
      idCode: "", // 코드
      idDateOfBirth: "", // 출생일
      idAge: "", // 연령
      idSex: "", // 성별
      idGroup: "", // 그룹
      idRegion: "", // 지역
      idSES: "", // 사회적 경제 지위
      idEdu: "", // 학력
      idRole: "", // 구성원
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("project header state", this.state)
    );
  };

  render() {
    return (
      <HeaderPresenter state={this.state} handleChange={this.handleChange} />
    );
  }
}

export default HeaderContainer;
