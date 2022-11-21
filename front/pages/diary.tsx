import styled from "styled-components";
import { Container, Wrapper, Box} from "../styles/layout";

export default function Diary() {
  return(
    <Wrapper>
      <CalendarContainer>
        Calendar
      </CalendarContainer>
      <Container>
        todo-list
      </Container>
    </Wrapper>
  );
};

const CalendarContainer = styled(Container)`
  width: 50em;
`;
