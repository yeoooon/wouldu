import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.color.background};
  border: 1px solid pink;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.nav};
  border-radius: 10px;
  border: 1px solid yellow;
`;
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid black;
`;