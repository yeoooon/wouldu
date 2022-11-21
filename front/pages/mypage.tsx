import Link from "next/link";
import styled from "styled-components";
import Seo from "../components/Seo";

import { Wrapper, Container, Box } from "../styles/layout";
import { colors } from "../styles/common_style";

export default function mypage() {
  const Mypage = styled.div`
    .sidebar {
      position: fixed;
      left: 0;
    }
  `

  return (
    <>
      <Seo title="마이페이지" />
      <div className="sidebar">
        사이드 바 메뉴
      </div>
      <Wrapper>
      <div>
        <Container>
          본문
        </Container>
      </div>
      </Wrapper>
    </>
  );
}