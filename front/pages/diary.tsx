import styled from "styled-components";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import DiaryMain from "@components/page/diary/DiaryMain";
import DiarySidebar from "@components/page/diary/DiarySidebar";
import NoDiaryConnect from "@components/page/diary/modal/NoDiaryConnect";

import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { Container, Wrapper, Box } from "../styles/layout";
import { getDiaries } from "../services/api/diary";
import { useGetFriend } from "@services/utils/useGetFriend";

const Diary = () => {
  const { isConnected } = useGetFriend();

  if (isConnected) {
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
  } else {
    return (
      <NoDiaryConnect />
    );
  }
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {  
  return {
    props: {},
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
