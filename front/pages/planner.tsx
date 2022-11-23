import TodoTemplate from "@components/page/planner/TodoTemplate";
import { SeoPageProps } from "@components/Seo";
import styled from "styled-components";
import { Container, Wrapper, Box } from "../styles/layout";

export default function Planner() {
  return(
    <PlannerWrapper>
      <CalendarContainer>
        Calendar
      </CalendarContainer>
      <TodoContainer>
        <TodoTemplate />
      </TodoContainer>
    </PlannerWrapper>
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

const PlannerWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 60% 35%;
  gap: 15px;
`;

const CalendarContainer = styled(Container)`
  height: 95vh;
`;

const TodoContainer = styled(CalendarContainer)`
  flex-direction: column;
  width: 100%;
  height: 95vh;
  justify-content: flex-start;
  position: relative;
`
