import React, { Component } from "react";
import ProjectStartPresenter from "./ProjectStartPresenter";

class ProjectStartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      fileName: "",
      file: null,
      conversationType: "",
    };
    this.getUploadedFile = this.getUploadedFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getUploadedFile = (e) => {
    const file = e.target.files[0];
    this.setState({ fileName: file.name, file });
  };

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log("project start state", this.state)
    );
  };

  render() {
    return (
      <ProjectStartPresenter
        state={this.state}
        getUploadedFile={this.getUploadedFile}
        handleChange={this.handleChange}
      />
    );
  }
}

export default ProjectStartContainer;
