import { SeoPageProps } from "@components/Seo";
import styled from "styled-components";
import { Container, Wrapper, Box } from "../styles/layout";

export default function Planner() {
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
      pageTitle: "일정관리",
      pageDesc: "우쥬 일정관리 페이지 입니다.",
    },
  };
}

const CalendarContainer = styled(Container)`
  width: 50em;
`;
