import { colors } from "@styles/common_style";
import { Wrapper } from "@styles/layout";
import Image from "next/image";
import styled from "styled-components";

const About = () => {
  return (
    <AboutWrapper>
      <FirstPage>
        첫페이지
        <Image src={'/aboutpic1.png'} width={500} height={500} />
      </FirstPage>
    </AboutWrapper>
  );
};
export default About;

const AboutWrapper = styled(Wrapper)`
  width: 100%;
  background-color: beige;
  height: 400vh;
  flex-direction: column;
`;
const FirstPage = styled(Wrapper)`
  background-image: url("/About.png");
  width: 100%;
  height: 100vh;
  color: ${colors.white};
`;
