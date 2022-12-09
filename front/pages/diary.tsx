import styled from "styled-components";
import DiaryMain from "@components/page/diary/DiaryMain";
import DiarySidebar from "@components/page/diary/DiarySidebar";
import NoDiaryConnect from "@components/page/diary/modal/NoDiaryConnect";

import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";
import { Container, Wrapper, Box } from "../styles/layout";
import { useGetFriend } from "@services/utils/useGetFriend";

import Loading from "@components/Loading";

const Diary = () => {
  const { isConnected, isLoading, friend } = useGetFriend();


  return !isLoading ? (
    <>
      {isConnected &&
        <DiaryWrapper>
          <SidebarContainer>
            <DiarySidebar />
          </SidebarContainer>
          <DiaryContainer>
            <DiaryMain title={friend?.title} />
          </DiaryContainer>
        </DiaryWrapper>      
      }
      {isConnected === false && <NoDiaryConnect></NoDiaryConnect>}
    </>
  ) : (
    <>
      <Loading></Loading>
    </>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {  
  return {
    props: {},
  };
});

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
