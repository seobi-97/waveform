# wavesurfer libaray를 이용한 파형 구현

[Wavesurfer Doc](https://wavesurfer-js.org/docs/)

[사용한 라이브러리](https://github.com/dschoon/react-waves)

[참고 자료1](https://nachwon.github.io/waveform/)

[참고 자료2](https://medium.com/trackstack/simple-audio-waveform-with-wavesurfer-js-and-react-ae6c0653b240)

## 추가해야할 기능

- [ ] UI (⭐)
- [ ] 구간이 있을 경우에도 전체 재생 (현재, 구간 존재시 해당 구간에 대해 loop만 됨)
- [ ] 전사 블럭 삭제 / 편집 / 분석상세보기 버튼

## Error

- [ ] clear all regions 후에, 구간 전사 블럭 클립의 재생이 멈추지 않음 (끝 부분이 맞지 않음)
- [ ] 구간 변경(이동, start point의 resize)시, 해당 전사 블럭에서 구간에 대해 재생되는 부분과 변경된 구간이 맞지 않음 => 구간과 전사 블럭의 연동 불안정
- [ ] 전체 play 버튼이 연동됨
