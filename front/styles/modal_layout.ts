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

export const ModalWrapper = styled.div`
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

export const ModalContainer = styled.div<{ width?: string; height?: string }>`
  position: relative;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border-radius: ${props => props.theme.borderSize.borderSm};
  width: ${props => (props.width ? props.width : "400px")};
  height: ${props => (props.height ? props.height : "300px")};
  background-color: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Cancel = styled.div`
align-self: flex-end;
margin: 0.8em;
cursor: pointer;
`;