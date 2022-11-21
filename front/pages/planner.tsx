import styled from "styled-components";
import { Container, Wrapper, Box} from "../styles/layout";

export default function Planner() {
  return(
    <PlannerWrapper>
      <CalendarContainer>
        Calendar
      </CalendarContainer>
      <TodoContainer>
        todo-list
      </TodoContainer>
    </PlannerWrapper>
  );
};

const PlannerWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 60% 35%;
  gap: 15px;
`;

const CalendarContainer = styled(Container)`
  height: 95vh;
`;

const TodoContainer = styled(CalendarContainer)`
`
