import React, { Component } from "react";
import ProjectStartPresenter from "./ProjectStartPresenter";

class ProjectStartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
    };
    this.getUploadedFile = this.getUploadedFile.bind(this);
  }

  getUploadedFile = (e) => {
    const file = e.target.files[0];
    this.setState({ fileName: file.name });
    console.log(file);
  };

  render() {
    const { fileName } = this.state;
    return (
      <ProjectStartPresenter
        fileName={fileName}
        getUploadedFile={this.getUploadedFile}
      />
    );
  }
}

export default ProjectStartContainer;
