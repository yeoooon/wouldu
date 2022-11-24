import { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Wrapper, Container, Box } from "../styles/layout";

import MypageTab from "../components/page/mypage/MypageTab";
import MyInfo from "../components/page/mypage/MyInfo";
import EditProfile from "../components/page/mypage/EditProfile";
import EditConnection from "../components/page/mypage/EditConnection";
import ChangePassword from "../components/page/mypage/ChangePassword";

import ModalBase from "../components/page/mypage/modal/ModalBase";

export type pageSelect = "mypage" | "profile" | "connect";
export interface pageProps {
  pageState: pageSelect;
  setPageState: Dispatch<SetStateAction<pageSelect>>;
}

const Mypage = () => {
  const [pageState, setPageState] = useState<pageSelect>("mypage");

  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      pageTitle: "마이페이지",
      pageDesc: "우쥬 마이페이지 입니다.",
    },
  };
}

const MypageArea = styled(Container)`
  display: grid;
  grid-template-rows: 0.5fr 1.5fr;
  grid-template-columns: 0.5fr 1fr 0.5fr;

  grid-template-areas:
    " .  tab  . "
    " .  main . ";
  
  align-content: center;
  
  .tab {
    grid-area: tab;
    align-self: start;
    justify-self: center;
    padding-top: 2rem;
  }

  .main {
    grid-area: main;
    align-self: start;
  }

  width: 900px;
  height: 500px;
`

export default Mypage;