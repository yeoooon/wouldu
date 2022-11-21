import Link from 'next/link';

import Seo from "../components/Seo";
import styled from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { colors, fontSize, borderSize } from "../styles/common_style";
import { darkTheme, lightTheme } from "../styles/theme";
import { Wrapper, Container, Box } from "../styles/layout";

// const Home: NextPage = () => {
//   return (
//     <>
//       <Seo title="Home" />
//       <div>Home</div>
//     </>
//   );
// };

export default function Home() {
  return (
    <>
      <Seo title="Home" />
      <Wrapper>
        <Header>
          <nav>
            <Link href='/'>LOGO</Link>
            <Link href='/login'><button>서비스 이용하러 가기</button></Link>
          </nav>
        </Header>
      <div>
        서비스 소개가 들어갈 공간
      </div>
      </Wrapper>
    </>
  );
}

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 999;
  height: 64px;
  background-color: ${props => props.theme.color.background};
  font-size: ${props => props.theme.fontSize.textLg};

  nav {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1.5rem;
  }
`;
