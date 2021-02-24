import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";

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

const NextBtn = styled.div`
  text-decoration: none;
  color: #ffffff;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #303f9f;
  padding: 10px;
  border: 1px solid #303f9f;
  border-radius: 5px;
  width: 100px;
  text-align: center;
  cursor: pointer;
`;

export default ({ fileName, getUploadedFile }) => {
  return (
    <Container style={{ marginTop: 150 }} component="main" maxWidth="md">
      <Typography component="h1" variant="h2" align="center">
        KSTARS
      </Typography>
      <Title>Project 시작하기</Title>
      <Form>
        <Grid container style={{ display: "flex", alignItems: "center" }}>
          <Grid xs="2">
            <Typography body2>프로젝트 명</Typography>
          </Grid>
          <Grid xs="9">
            <TextField
              required
              label="프로젝트 명"
              name="projectName"
              helperText="프로젝트 명을 기재해주세요."
              fullWidth
              style={{ marginLeft: 10 }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 30 }}>
          <Grid xs="2">
            <Typography body2 style={{ marginTop: 20 }}>
              음성파일 등록
            </Typography>
          </Grid>
          <Grid xs="9" style={{ display: "flex", alignItems: "center" }}>
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
              Upload
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
          <Grid xs="2">
            <Typography body2 style={{ marginTop: 20 }}>
              헤더 정보 입력
            </Typography>
          </Grid>
          <Grid xs="9">
            <TextField
              required
              label="구성원"
              name="Role"
              // value={projectName}
              // onChange={handleValueChange}
              helperText="구성원을 기재해주세요. (예)mother, father...etc"
              fullWidth
              style={{ marginLeft: 10 }}
            />
          </Grid>
        </Grid>
      </Form>
      <Link to="/waveform/main">
        <NextBtn>Start</NextBtn>
      </Link>
    </Container>
  );
};
