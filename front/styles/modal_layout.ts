import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 120px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const ModalContainer = styled.div`
  z-index: 10000;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Cancel = styled.div`
align-self: flex-end;
margin: 0.8em;
cursor: pointer;
`;