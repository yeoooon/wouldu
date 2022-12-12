import { Wrapper } from "../styles/layout";
import { useRecoilValue } from "recoil";
import { loginStateSelector, userAtom } from "../recoil/user";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import About from "@components/page/about/About";
import { useRouter } from "next/router";
import { getCookie } from "@services/utils/cookies";
import styled from "styled-components";

const Home: NextPage = () => {
  const isLoginStateAtom = useRecoilValue(loginStateSelector);
  const [isLoginState, setIsLoginState] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setIsLoginState(isLoginStateAtom);
  }, [isLoginStateAtom]);

  useEffect(() => {
    if (isLoginState && getCookie("userToken")) {
      // console.log(isLoginState);
      router.push("/stamp");
    }
  }, [isLoginState]);

  return (
    <>
      <NewWrapper>{isLoginState || <About />}</NewWrapper>
    </>
  );
};

const NewWrapper = styled(Wrapper)`
  height: 440vh;
`;
export default Home;
