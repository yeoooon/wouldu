import Link from "next/link";
import styled from "styled-components";
import Seo from "../components/Seo";
import MypageTab from "../components/mypage/mypagetab";

import { Wrapper, Container, Box } from "../styles/layout";

const mypage = () => {
  return (
    <>
      <Seo title="마이페이지" />
      <div className="sidebar">
        사이드 바 메뉴
      </div>
      <Wrapper>
      <div>
        <Container>
          <MypageTab></MypageTab>
        </Container>
      </div>
      </Wrapper>
    </>
  );
}

export default mypage;