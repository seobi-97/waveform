import React, { Component , useContext} from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  //스타일
  layout: {},
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  guest: {
    marginTop: 50,
  },
}));
class Save extends Component {
  constructor(props) {
      super(props);
      this.state = {
        filename: "",
        open: false,
        message: "test", //test용
        result: this.props.result,
      };
    this.SaveFile = this.SaveFile.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  handleClickOpen() {
    //저장하기 버튼 Click시
    this.setState({
      open: true,
    });
  }
  handleClose() {
    //닫기 버튼 Click시
    this.setState({
      filename: "",
      open: false,
    });
  }

  SaveFile = (e) => {
    e.preventDefault();
    let result = this.props.result;
    this.props.handleResult(result);
    console.log(result);
    let d = this.state.d;
    console.log(d);
    var FileSaver = require("file-saver");
    //var blob=new Blob([this.state.brdno+`\n`+`발화자: `+this.state.talker+`\n`+`발화내용: `+this.state.text], { type : "text / plain; charset = utf-8" } ) ;
    var blob = new Blob([JSON.stringify(result,null,1)], {
      type: "text / plain; charset = utf-8",
    });
    FileSaver.saveAs(blob, this.state.filename + `.txt`);
    this.setState({
      filename: "",
      open: false,
    });
  };
  handleFileChange(e) {
    this.setState({
      fileName: e.target.value,
    });
  }
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render() {
    const classes = useStyles;
    return (
      <div>
        <Button
          className="Save button"
          type="submit"
          color="primary"
          variant="contained"
          style={{ margin: 20, padding: 10 }}
          onClick={this.handleClickOpen}
        >
          저장하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>저장하기</DialogTitle>
          <DialogContent>
            <TextField
              label="제목"
              type="text"
              name="filename"
              value={this.state.filename}
              onChange={this.handleValueChange}
            ></TextField>
            <Button onClick={this.SaveFile}>저장</Button>
            <Button onClick={this.handleClose}>닫기</Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Save;
