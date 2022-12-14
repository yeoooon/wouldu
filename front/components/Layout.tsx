import { isAlarmModalAtom, isSurveyModalAtom } from "@recoil/modal";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginStateSelector, userAtom } from "../recoil/user";
import AfterNavbar from "./AfterNavbar";
import AlarmModal from "./AlarmModal";
import BeforeNavBar from "./BeforeNavbar";
import SurveyModal from "./SurveyModal";

export interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const Layout = ({ children, darkMode, setDarkMode }: LayoutProps) => {
  const isLoginStateAtom = useRecoilValue(loginStateSelector);
  const [isLoginState, setIsLoginState] = useState<boolean>(false);
  const isAlarmOpen = useRecoilValue(isAlarmModalAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    setIsLoginState(isLoginStateAtom);
  }, [isLoginStateAtom]);

  return (
    <>
      {isLoginState && (
        <LayoutWrapper>
          <AfterNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div>{children}</div>
          <AlarmModal />
          {user?.isFirstLogin === 0 && <SurveyModal />}
        </LayoutWrapper>
      )}
      {isLoginState || (
        <>
          <BeforeNavBar />
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
