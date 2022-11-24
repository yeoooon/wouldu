import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginStateSelector } from "../recoil/user";
import { Container } from "../styles/layout";
import AfterNavbar from "./AfterNavbar";
import BeforeNavBar from "./BeforeNavbar";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isLoginState = useRecoilValue(loginStateSelector);
  return (
    <>
      {isLoginState && (
        <LayoutWrapper>
          <AfterNavbar />
          <div>{children}</div>
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
}

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 720px;
`;
