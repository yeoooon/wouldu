import Link from "next/link";
import styled from "styled-components";
import { Wrapper, Container, Box } from "../styles/layout";

import MypageTab from "../components/mypage/mypagetab";
import MyInfo from "../components/mypage/myinfo";
import EditProfile from "../components/mypage/editprofile";
import EditMatching from "../components/mypage/editmatching";

const Mypage = () => {
  return (
    <>
      <Wrapper>
        <div className="sidebar">
          사이드 바 메뉴
        </div>
        <MypageArea>
          <div className="tab"><MypageTab></MypageTab></div>
          {/* <div className="main"><MyInfo></MyInfo></div> */}
          {/* <div className="main"><EditProfile></EditProfile></div> */}
          <div className="main"><EditMatching></EditMatching></div>
        </MypageArea>
      </Wrapper>
    </>
  );
}

const MypageArea = styled(Container)`
  display: grid;
  grid-template-rows: 1fr 2fr;
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