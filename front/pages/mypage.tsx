import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Wrapper, Container, Box } from "../styles/layout";

import MypageTab from "../components/mypage/MypageTab";
import MyInfo from "../components/mypage/MyInfo";
import EditProfile from "../components/mypage/EditProfile";
import BeforeMatching from "../components/mypage/BeforeMatching";
import AfterMatching from "../components/mypage/AfterMatching";
import ChangePassword from "../components/mypage/ChangePassword";

import ModalBase from "../components/mypage/modal/ModalBase";

const Mypage = () => {
  return (
    <>
      <Wrapper>
        <MypageArea>
          <div className="tab"><MypageTab></MypageTab></div>
          {/* <div className="main"><MyInfo></MyInfo></div> */}
          <div className="main"><EditProfile></EditProfile></div>
          {/* <div className="main"><BeforeMatching></BeforeMatching></div> */}
          {/* <div className="main"><AfterMatching></AfterMatching></div> */}
          {/* <div className="main"><ChangePassword></ChangePassword></div> */}
          {/* <div className="main"><ModalBase></ModalBase></div> */}
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