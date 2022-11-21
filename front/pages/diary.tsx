import styled from "styled-components";
import { Container, Wrapper, Box} from "../styles/layout";

export default function Diary() {
  return(
    <Wrapper>
      <ListContainer>
        list
      </ListContainer>
      <DiaryContainer>
        diary
      </DiaryContainer>
    </Wrapper>
  );
};

const DiaryWrapper = styled.div`
  justify-content: space-around;
`;


const ListContainer = styled(Container)`
  width: 15em;
  height: 95vh;
  margin-left: 15px;
`;

const DiaryContainer = styled(ListContainer)`
  width: 40em;
  margin-right: 15px;
`
