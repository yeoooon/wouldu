import styled from "styled-components";
import { Container, Wrapper, Box} from "../styles/layout";

export default function Diary() {
  return(
    <DiaryWrapper>
      <ListContainer>
        list
      </ListContainer>
      <DiaryContainer>
        diary
      </DiaryContainer>
    </DiaryWrapper>
  );
};

const DiaryWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 25% 70%;
  gap: 15px;
`;


const ListContainer = styled(Container)`
  height: 95vh;
  margin-left: 15px;
`;

const DiaryContainer = styled(ListContainer)`
  margin-right: 15px;
`
