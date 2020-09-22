import styled from "styled-components";

export const WaveformContianer = styled.div`
  height: 80px;
  width: 100%;
  background: transparent;
  border: 1px solid black;
`;

export const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  background: #efefef;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  margin-bottom: 5px;
  &:hover {
    background: #ddd;
  }
`;
