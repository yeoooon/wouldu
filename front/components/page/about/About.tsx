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
import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

interface Show {
  itemOne: boolean;
  itemTwo: boolean;
  itemThree: boolean;
  itemFour: boolean;
  itemFive: boolean;
}

const About = () => {

  const [show, doShow] = useState<Show>({
    itemOne: false,
    itemTwo: false,
    itemThree: false,
    itemFour: false,
    itemFive: false,
  });
  const ourRef = useRef(null),
    anotherRef = useRef(null),
    refThree = useRef(null),
    refFour = useRef(null),
    refFive = useRef(null);

  useLayoutEffect(() => {
    const topPos = (element: any | null) => element?.getBoundingClientRect().top;
    const div1Pos = topPos(ourRef.current),
      div2Pos = topPos(anotherRef.current),
      div3Pos = topPos(refThree.current),
      div4Pos = topPos(refFour.current),
      div5Pos = topPos(refFive.current);

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      if (div1Pos < scrollPos) {
        doShow(state => ({ ...state, itemOne: true }));
      } else if (div2Pos < scrollPos) {
        doShow(state => ({ ...state, itemTwo: true }));
      } else if (div3Pos < scrollPos) {
        doShow(state => ({ ...state, itemThree: true }));
      } else if (div4Pos < scrollPos) {
        doShow(state => ({ ...state, itemFour: true }));
      } else if (div5Pos < scrollPos) {
        doShow(state => ({ ...state, itemFive: true }));
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AboutWrapper>
      <FirstPage>
        <Left animate={show.itemFive} ref={refFive}>
          <MainTitle>
            {aboutText[0].title}
          </MainTitle>
          <SubTitle>
            {aboutText[0].dessciption}
          </SubTitle>
          <Link href="/login">
            <Button>우쥬 하러가기</Button>
          </Link>
        </Left>
        <Right animate={show.itemFive} ref={refFive}>
          <Image src={'/aboutpic1.png'} width={500} height={500} />
        </Right>
      </FirstPage>
      <SecondPart animate={show.itemFour} ref={refFour}>
        <ImageArea>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea>
          <IconBox><NoteIcon /></IconBox>
          <MainText>{aboutText[1].title}</MainText>
          <SubText>{aboutText[1].dessciption}</SubText>
        </TextArea>
      </SecondPart>
      <ThirdPart animate={show.itemThree} ref={refThree}>
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
      <ForthPart animate={show.itemTwo} ref={anotherRef}>
        <ImageArea>
          <Image src={'/temporaryimage.png'} width={700} height={400} />
        </ImageArea>
        <TextArea>
          <IconBox><HomeIcon /></IconBox>
          <MainText>{aboutText[3].title}</MainText>
          <SubText>{aboutText[3].dessciption}</SubText>
        </TextArea>
      </ForthPart>
      <FifthPart animate={show.itemOne} ref={ourRef}>
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
  height: 440vh;
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
const Left = styled.div<{ animate: boolean }>`

  display: flex;
  flex-direction: column;
  justify-self: flex-end;
  width: 70%;
  gap: 3vh;
  transform: translateY(${({ animate }) => (animate ? "0" : "-5vh")});
  transition: transform 1s;
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
  font-weight: 600;
  font-size: ${props => props.theme.fontSize.textMd};
  height: 2.5em;
  width: 15em;
`;
const Right = styled.div<{ animate: boolean }>`
  padding-left: 10vh;
  transform: translateY(${({ animate }) => (animate ? "0" : "5vh")});
  transition: transform 1s;
`;

const SecondPart = styled.div<{ animate: boolean }>`
  width: 100%;
  height: 85vh;
  display: grid;
  grid-template-columns: 60% 40%; 
  transform: translateY(${({ animate }) => (animate ? "0" : "20vw")});
  transition: transform 1s;
`;
const ImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NoteIcon = styled(Note)``;
const NotePadIcon = styled(Notepad)``;
const HomeIcon = styled(Home)``;
const MypageIcon = styled(Mypage)``;
const TextArea = styled.div`
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
const ThirdPart = styled.div<{ animate: boolean }>`
  width: 100%;
  height: 85vh;
  display: grid;
  grid-template-rows: 35% 65%; 
  transform: translateY(${({ animate }) => (animate ? "0" : "20vw")});
  transition: transform 1s;
`;
const TopArea = styled.div`
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
const BottomArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10vh;
`;
const ForthPart = styled(SecondPart)``;
const FifthPart = styled(SecondPart)``;

export default About;