import styled from "styled-components";
import { Container, Wrapper, Box} from "../styles/layout";

export default function Planner() {
  return(
    <Wrapper>
      <CalendarContainer>
        Calendar
      </CalendarContainer>
      <TodoContainer>
        todo-list
      </TodoContainer>
    </Wrapper>
  );
};

const PlannerWrpper = styled(Wrapper)`
  display: flex;
  justify-content: space-around;
`;

const CalendarContainer = styled(Container)`
  width: 30em;
  height: 95vh;
  margin-left: 15px;
`;

const TodoContainer = styled(CalendarContainer)`
  width: 30em;
`
