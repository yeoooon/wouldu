import Link from "next/link";

import styled from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { colors, fontSize, borderSize } from "../styles/common_style";
import { darkTheme, lightTheme } from "../styles/theme";
import { Wrapper, Container, Box } from "../styles/layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginStateSelector, userAtom } from "../recoil/user";
import { useEffect } from "react";
import { NextPage } from "next";
import About from "@components/page/about/About";

const Home: NextPage = () => {
  const isLoginState = useRecoilValue(loginStateSelector);
  useEffect(() => {
    console.log("isLoginState", isLoginState);
  }, [isLoginState]);

  return (
    <>
      <Wrapper>
        {isLoginState && <div>로그인된상태</div>}
        {isLoginState || <About />}
      </Wrapper>
    </>
  );
};
export default Home;
