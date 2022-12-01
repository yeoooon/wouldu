import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { colors } from "@styles/common_style";

const BeforeNavBar = () => {
  return (
    <Header>
      <nav>
        <Image src="/icon/logoblack.svg" alt="logo" width={180} height={60} />

        <Link href="/login">
          <button>서비스 이용하러 가기</button>
        </Link>
      </nav>
    </Header>
  );
};

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 999;
  height: 64px;
  background-color: ${colors.white};
  font-size: ${props => props.theme.fontSize.textLg};

  nav {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1.5rem;
  }
`;

export default BeforeNavBar;
