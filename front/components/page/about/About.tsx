import { colors } from "@styles/common_style";
import Image from "next/image";
import styled from "styled-components";
import Home from "public/icon/home.svg";
import Mypage from "public/icon/me.svg";
import Note from "public/icon/note.svg";
import Notepad from "public/icon/notepad.svg";
import { HandshakeIcon } from "@components/icons/HandshakeIcon";
import { aboutText } from "@services/utils/aboutText";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { cardVariants, TextVariants } from "./styles";

const About = () => {

  return (
    <AboutWrapper>
      <FirstPage>
        <Left       
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
          <MainTitle>
            {aboutText[0].title}
          </MainTitle>
          <SubTitle>
            {aboutText[0].dessciption}
          </SubTitle>
          <Link href="/login">
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >우쥬 하러가기</Button>
          </Link>
        </Left>
        <Right
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
          <Image src={'/aboutpic1.png'} width={500} height={500} />
        </Right>
      </FirstPage>
      <SecondPart
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
      >
        <ImageArea variants={cardVariants}>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea variants={TextVariants}>
          <IconBox><NoteIcon /></IconBox>
          <MainText>{aboutText[1].title}</MainText>
          <SubText>{aboutText[1].dessciption}</SubText>
        </TextArea>
      </SecondPart>
      <ThirdPart
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
      >
        <TopArea variants={TextVariants}>
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
        <BottomArea variants={cardVariants}>
          <Image src={'/temporaryimage.png'} width={380} height={250} />
          <Image src={'/temporaryimage.png'} width={380} height={250} />
          <Image src={'/temporaryimage.png'} width={380} height={250} />
        </BottomArea>
      </ThirdPart>
      <ForthPart
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
      >
        <ImageArea variants={cardVariants}>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea variants={TextVariants}>
          <IconBox><HomeIcon /></IconBox>
          <MainText>{aboutText[3].title}</MainText>
          <SubText>{aboutText[3].dessciption}</SubText>
        </TextArea>
      </ForthPart>
      <FifthPart
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
      >
        <ImageArea variants={cardVariants}>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea variants={TextVariants}>
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
  height: 440vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
`;
const FirstPage = styled(motion.div)`
  background-image: url("/About.png");
  width: 100%;
  height: 100vh;
  color: ${colors.white};
  display: grid;
  grid-template-columns: 50% 50%; 
  align-items: center;
  justify-content: center;
`;
const Left = styled(motion.div)`
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
  width: 100%;
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
const Button = styled(motion.button)`
  font-weight: 600;
  font-size: ${props => props.theme.fontSize.textMd};
  height: 2.5em;
  width: 15em;
`;
const Right = styled(motion.div)`
  padding-left: 10vh;
`;

const SecondPart = styled(motion.div)`
  width: 100%;
  height: 85vh;
  display: grid;
  grid-template-columns: 60% 40%; 
`;
const ImageArea = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NoteIcon = styled(Note)``;
const NotePadIcon = styled(Notepad)``;
const HomeIcon = styled(Home)``;
const MypageIcon = styled(Mypage)``;
const TextArea = styled(motion.div)`
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
const ThirdPart = styled(motion.div)`
  width: 100%;
  height: 85vh;
  display: grid;
  grid-template-rows: 35% 65%; 
`;
const TopArea = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  justify-self: center;
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
const BottomArea = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10vh;
`;
const ForthPart = styled(SecondPart)``;
const FifthPart = styled(SecondPart)``;

export default About;