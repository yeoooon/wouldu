import { SeoPageProps } from "@components/Seo";
import { useEffect } from "react";
import styled from "styled-components";
import { Container, Wrapper, Box } from "../styles/layout";

export default function Diary() {
  // useEffect(() => {
  //   throw Error("error");
  // }, []);
  return (
    <Wrapper>
      <CalendarContainer>Calendar</CalendarContainer>
      <Container>todo-list</Container>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      pageTitle: "교환일기",
      pageDesc: "우쥬 교환일기 페이지 입니다.",
    },
  };
}

const CalendarContainer = styled(Container)`
  width: 50em;
`;
