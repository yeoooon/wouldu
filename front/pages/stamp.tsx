import EmotionAnalsis from "@components/page/stamp/EmotionAnalsis";
import EmotionCalendar from "@components/page/stamp/EmotionCalendar";
import EmotionGraph from "@components/page/stamp/EmotionGraph";
import StampDiary from "@components/page/stamp/StampDiary";
import StampTodoList from "@components/page/stamp/StampTodoList";
import { Box, Container, Wrapper } from "@styles/layout";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import withGetServerSideProps from "../hocs/withGetServersideProps";

const stamp = () => {
  const [openStamp, setOpenStamp] = useState(false);

  const handleToggle = () => setOpenStamp(!openStamp);

  return (
    <StampWrapper>
      <LeftContainer>
        <LeftBox>
          <StampDiary />
        </LeftBox>
        <LeftBox>
          <StampTodoList />
        </LeftBox>
      </LeftContainer>
      <RightContainer>
        <ButtonBox>
          <Button 
            onClick={handleToggle}
            className={openStamp ? "" : "active"}
          >나</Button>
          <Button 
            onClick={handleToggle}
            className={openStamp ? "active" : ""}
          >상대방</Button>
        </ButtonBox>
        <CalendarBox>
          <EmotionCalendar />
        </CalendarBox>
        <EmotionBox>
          <EmotionGraph />
          <EmotionAnalsis />
        </EmotionBox>
      </RightContainer>
    </StampWrapper>
  );
};

export default stamp;

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const StampWrapper = styled(Wrapper)`
  justify-content: space-evenly;
`;

const LeftContainer = styled(Container)`
  flex-direction: column;
  justify-content: space-between;
  width: 36%;
  height: 95vh;
  background-color: ${props => props.theme.color.background};
`;

const RightContainer = styled(Container)`
  flex-direction: column;
  width: 58%;
  height: 95vh;
`;

const LeftBox = styled(Box)`
  width: 100%;
  height: 49%;
  background-color: ${props => props.theme.color.nav};
`;
const ButtonBox = styled.div`
  width: 100%;
  justify-content: flex-start;
  padding: 0 1.5em;
`;
const Button = styled.button`
  background-color: inherit;
  color: ${props => props.theme.color.fontMain};
  width: 8em;
  height: 5vh;
  border-radius: 0;
  &.active {
    border-bottom: 2px solid ${props => props.theme.color.fontPoint};
    color: ${props => props.theme.color.fontPoint};
    font-weight: 700;
  } 
  :hover {
    background-color: inherit;
    font-weight: 700;
  }
`;
const CalendarBox = styled.div`
  width: 85%;
  height: 55vh;
`;
const EmotionBox = styled(CalendarBox)`
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
`;