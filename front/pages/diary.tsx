import { SeoPageProps } from "@components/Seo";
import { useEffect } from "react";
import styled from "styled-components";
import { Container, Wrapper, Box } from "../styles/layout";

export default function Diary() {
  // useEffect(() => {
  //   throw Error("error");
  // }, []);
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
}

export async function getServerSideProps() {
  return {
    props: {
      pageTitle: "교환일기",
      pageDesc: "우쥬 교환일기 페이지 입니다.",
    },
  };
}

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
