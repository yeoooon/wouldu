import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.color.background};
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.nav};
`;
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;