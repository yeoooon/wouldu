import Calendar from "@components/page/planner/Calendar";
import TodoTemplate from "@components/page/planner/TodoTemplate";
import { SeoPageProps } from "@components/Seo";
import { GetServerSidePropsContext } from "next";
import styled from "styled-components";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { Container, Wrapper, Box } from "../styles/layout";

const Planner = () => {
  return (
    <PlannerWrapper>
      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
      <TodoContainer>
        <TodoTemplate />
      </TodoContainer>
    </PlannerWrapper>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const PlannerWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 60% 35%;
  gap: 15px;
`;

const CalendarContainer = styled(Container)`
  height: 95vh;
  border: 1px solid ${props => props.theme.color.border};
  width: 100%;
`;

const TodoContainer = styled(CalendarContainer)`
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

export default Planner;
