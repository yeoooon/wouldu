import { colors } from "@styles/common_style";
import { Box } from "@styles/layout";
import Image from "next/image";
import styled from "styled-components";
import Home from "public/icon/home.svg";
import Mypage from "public/icon/me.svg";
import Note from "public/icon/note.svg";
import Notepad from "public/icon/notepad.svg";
import { HandshakeIcon } from "@components/icons/HandshakeIcon";
import { aboutText } from "@services/utils/aboutText";

const About = () => {
  return (
    <AboutWrapper>
      <FirstPage>
        <Left>
          <MainTitle>
            {aboutText[0].title}
          </MainTitle>
          <SubTitle>
            {aboutText[0].dessciption}
          </SubTitle>
          <Button>우쥬 하러가기</Button>
        </Left>
        <Right>
          <Image src={'/aboutpic1.png'} width={500} height={500} />
        </Right>
      </FirstPage>
      <SecondPart>
        <ImageArea>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea>
          <IconBox><NoteIcon /></IconBox>
          <MainText>{aboutText[1].title}</MainText>
          <SubText>{aboutText[1].dessciption}</SubText>
        </TextArea>
      </SecondPart>
      <ThirdPart>
        <TopArea>
          <TextArea>
            <MainText>{aboutText[2].title}</MainText>
            <SubText>{aboutText[2].dessciption}</SubText>
          </TextArea>
          <IconBox>
            <MypageIcon />
            <HandshakeIcon />
            <MypageIcon />
          </IconBox>
        </TopArea>
        <BottomArea>
          <Image src={'/temporaryimage.png'} width={380} height={250} />
          <Image src={'/temporaryimage.png'} width={380} height={250} />
          <Image src={'/temporaryimage.png'} width={380} height={250} />
        </BottomArea>
      </ThirdPart>
      <ForthPart>
        <ImageArea>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea>
          <IconBox><HomeIcon /></IconBox>
          <MainText>{aboutText[3].title}</MainText>
          <SubText>{aboutText[3].dessciption}</SubText>
        </TextArea>
      </ForthPart>
      <FifthPart>
        <ImageArea>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea>
          <IconBox><NotePadIcon /></IconBox>
          <MainText>{aboutText[4].title}</MainText>
          <SubText>{aboutText[4].dessciption}</SubText>
        </TextArea>
      </FifthPart>
    </AboutWrapper>
  );
};

const AboutWrapper = styled.div`
  width: 100%;
  background-color: ${colors.white};
  height: 400vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const FirstPage = styled.div`
  background-image: url("/About.png");
  width: 100%;
  height: 100vh;
  color: ${colors.white};
  display: grid;
  grid-template-columns: 50% 50%; 
  align-items: center;
  justify-content: center;
`;
const Left = styled.div`
  /* background-color: rebeccapurple; */
  display: flex;
  flex-direction: column;
  justify-self: flex-end;
  width: 70%;
  gap: 3vh;
`;
const MainTitle = styled.p`
  font-size: 45px;
  line-height: 45px;
  font-weight: 700;
  width: 80%;
  letter-spacing: 1px;
  line-height: 50px;
  white-space: pre-line;
`;
const SubTitle = styled.p`
  font-size: ${props => props.theme.fontSize.textMd};
  letter-spacing: 1px;
  line-height: 20px;
  color: ${colors.purple_200};
`;
const Button = styled.button`
  width: 15em;
`;
const Right = styled.div`
  padding-left: 10vh;
  /* background-color: royalblue; */
`;

const SecondPart = styled.div`
  width: 100%;
  height: 75vh;
  /* background-color: pink; */
  display: grid;
  grid-template-columns: 60% 40%; 
`;
const ImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: palegoldenrod; */
`;
const NoteIcon = styled(Note)``;
const NotePadIcon = styled(Notepad)``;
const HomeIcon = styled(Home)``;
const MypageIcon = styled(Mypage)``;
const TextArea = styled.div`
  /* background-color: palegreen; */
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2vh;
`;
const IconBox = styled.div`
  ${NoteIcon}, ${HomeIcon}, ${MypageIcon}, ${NotePadIcon} {
    width: 40px;
    height: 40px;
    path {
      fill: ${colors.purple_300};
    }
 }
`;
const MainText = styled.p`
  font-size: ${props => props.theme.fontSize.textXl};
  color: ${colors.gray_500};
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 35px;
  white-space: pre-line;
`;
const SubText = styled.p`
  font-size: ${props => props.theme.fontSize.textMain};
  color: ${colors.gray_400};
  width: 70%;
  letter-spacing: 1px;
  line-height: 20px;
`;
const ThirdPart = styled.div`
  width: 100%;
  height: 75vh;
  display: grid;
  grid-template-rows: 35% 65%; 
  /* background-color: hotpink; */

`;
const TopArea = styled.div`
  display: flex;
  justify-content: space-around;
  justify-self: center;
  /* background-color: rebeccapurple; */
  width: 80%;
  padding: 1em;
  ${IconBox} {
    padding: 1em;
    display: flex;
    align-items: center;
    ${MypageIcon} {
      width: 60px;
      height: 60px;
    }
  }
`;
const BottomArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: honeydew; */
  gap: 10vh;
`;
const ForthPart = styled(SecondPart)`
  /* background-color: plum; */
`;
const FifthPart = styled(SecondPart)`
  /* background-color: palevioletred; */
`;

export default About;