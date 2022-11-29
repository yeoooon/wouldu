import styled from "styled-components";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import DiaryMain from "@components/page/diary/DiaryMain";
import DiarySidebar from "@components/page/diary/DiarySidebar";
import { Container, Wrapper, Box } from "../styles/layout";
import { getDiaries } from "../services/api/diary";

import withGetServerSideProps from "../hocs/withGetServersideProps";
import { GetServerSidePropsContext } from "next";

const Diary = () => {
  return (
    <DiaryWrapper>
      <SidebarContainer>
        <DiarySidebar />
      </SidebarContainer>
      <DiaryContainer>
        <DiaryMain />
      </DiaryContainer>
    </DiaryWrapper>
  );
}

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['diaries'], getDiaries);
  
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(['diaries'], getDiaries);
  
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

const DiaryWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 26% 70%;
  width: 100%;
  gap: 1.5%;
`;

const SidebarContainer = styled(Container)`
  height: 95vh;
  position: relative;
  border: 1px solid ${props => props.theme.color.border};
`;

const DiaryContainer = styled(SidebarContainer)``;

export default Diary;