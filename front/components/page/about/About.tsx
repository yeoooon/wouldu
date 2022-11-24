import { Wrapper } from "@styles/layout";
import styled from "styled-components";

const About = () => {
  return (
    <AboutWrapper>
      <div>소개페이지!</div>
    </AboutWrapper>
  );
};
export default About;

const AboutWrapper = styled(Wrapper)`
  width: 100%;
  background-color: yellow;
`;
