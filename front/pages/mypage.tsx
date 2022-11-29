import { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Wrapper, Container, Box } from "../styles/layout";

import MypageTab from "@components/page/mypage/mypagetab";
import MyInfo from "@components/page/mypage/myinfo";
import EditConnection from "@components/page/mypage/EditConnection";
import EditProfile from "@components/page/mypage/editprofile";
import ChangePassword from "@components/page/mypage/changepassword";
import ModalBase from "@components/page/mypage/modal/ModalBase";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";

export type pageSelect = "mypage" | "profile" | "connect";
export interface pageProps {
  pageState: pageSelect;
  setPageState: Dispatch<SetStateAction<pageSelect>>;
}

const Mypage = () => {
  const [pageState, setPageState] = useState<pageSelect>("mypage");

  return (
    <MypageArea>
      <div className="tab">
        <MypageTab pageState={pageState} setPageState={setPageState}></MypageTab>
      </div>
      <div className="main">
        {pageState === "mypage" && <MyInfo></MyInfo>}
        {pageState === "profile" && <EditProfile></EditProfile>}
        {pageState === "connect" && <EditConnection></EditConnection>}
      </div>
    </MypageArea>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const MypageArea = styled(Wrapper)`
  display: grid;
  grid-template-rows: 20% 80%;
  grid-template-columns: 10% 80% 10%;

  grid-template-areas:
    " .  tab  . "
    " .  main . ";

  align-content: center;

  .tab {
    grid-area: tab;
    align-self: center;
    justify-self: center;
  }

  .main {
    grid-area: main;
    align-self: center;

    width: 100%;
    height: 100%;
  }
`;

export default Mypage;
