import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DataContext from "../../../Contexts/DataContext";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const Title = styled.h2`
  color: #303f9f;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  width: 100%;
  border: 1px solid #303f9f;
  border-radius: 10px;
  padding: 20px 30px;
`;

const NextBtn = styled(Link)`
  margin-top: 30px;
  text-decoration: none;
  color: #ffffff;
  background-color: #303f9f;
  padding: 10px;
  border: 1px solid #303f9f;
  border-radius: 5px;
  cursor: pointer;
`;

export default ({ state, getUploadedFile, handleChange }) => {
  const { projectName, fileName } = state;
  const projData = useContext(DataContext);

  return (
    <Container style={{ marginTop: 150 }} component="main" maxWidth="md">
      <Typography component="h1" variant="h2" align="center">
        KSTARS
      </Typography>
      <Title>Project 시작하기</Title>
      <Form>
        <Grid container style={{ display: "flex", alignItems: "center" }}>
          <Grid xs={2} item={true}>
            <Typography>프로젝트 명</Typography>
          </Grid>
          <Grid xs={9} item={true}>
            <TextField
              required
              value={projectName}
              onChange={handleChange}
              name="projectName"
              label="프로젝트 명"
              helperText="프로젝트 명을 기재해주세요."
              fullWidth
              style={{ marginLeft: 10 }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 30 }}>
          <Grid xs={2} item={true}>
            <Typography style={{ marginTop: 20 }}>음성파일 등록</Typography>
          </Grid>
          <Grid
            xs={9}
            item={true}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Input
              type="text"
              placeholder="파일 명*"
              readOnly
              value={fileName}
              fullWidth={true}
              required
              style={{ margin: 10 }}
            />
            <Button variant="contained" color="primary" component="label">
              Browse
              <input
                type="file"
                accept="audio/*"
                onChange={getUploadedFile}
                hidden
              />
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 30 }}>
          <Grid xs={2} item={true}>
            <Typography style={{ marginTop: 20 }}>전사 타입</Typography>
          </Grid>
          <Grid xs={9} item={true}>
            <FormControl
              component="fieldset"
              style={{ marginLeft: 10, marginTop: 15 }}
            >
              <RadioGroup
                aria-label="type"
                name="conversationType"
                row
                onChange={handleChange}
              >
                <FormControlLabel
                  value="narration"
                  control={<Radio />}
                  label="나레이션"
                />
                <FormControlLabel
                  value="conversation"
                  control={<Radio />}
                  label="대화"
                />
                <FormControlLabel
                  value="etc"
                  control={<Radio />}
                  label="기타"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Form>
      <NextBtn
        to="/waveform/start/header"
        onClick={() => {
          projData.update({ ...state });
        }}
      >
        헤더 마법사로 이동
      </NextBtn>
    </Container>
  );
};
