import styled from "styled-components";

export const Overlay = styled.div`
  z-index: 100;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalWrap = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const ModalBox = styled.div<{ width?: string; height?: string }>`
  position: relative;
  z-index: 1000;
  width: ${props => (props.width ? props.width : "600px")};
  height: ${props => (props.height ? props.height : "570px")};
  background-color: ${props => props.theme.color.purpleBox};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  /* padding: 1rem 1rem; */
  /* border: solid 1px ${props => props.theme.color.border}; */
`;
