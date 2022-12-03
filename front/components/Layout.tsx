import { isAlarmModalAtom } from "@recoil/modal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginStateSelector, userAtom } from "../recoil/user";
import AfterNavbar from "./AfterNavbar";
import AlarmModal from "./AlarmModal";
import BeforeNavBar from "./BeforeNavbar";

export interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const Layout = ({ children, darkMode, setDarkMode }: LayoutProps) => {
  const isLoginStateAtom = useRecoilValue(loginStateSelector);
  const [isLoginState, setIsLoginState] = useState<boolean>(false);
  const isAlarmOpen = useRecoilValue(isAlarmModalAtom);

  useEffect(() => {
    setIsLoginState(isLoginStateAtom);
  }, [isLoginStateAtom]);

  return (
    <>
      {isLoginState && (
        <LayoutWrapper>
          <AfterNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
          {/* <div>로그인된상태</div> */}
          <div>{children}</div>
          {isAlarmOpen && <AlarmModal/>}
        </LayoutWrapper>
      )}
      {isLoginState || (
        <>
          <BeforeNavBar />
          {/* <About /> */}
          <div>{children}</div>
        </>
      )}
    </>
  );
};

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 720px;
`;

export default Layout;
