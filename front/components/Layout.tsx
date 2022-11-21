import styled from "styled-components";
import { Container } from "../styles/layout";
import NavBar from "./Navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <NavBar />
      <div>{children}</div>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  width: 1280px;
  height: 720px;
  display: flex;
`;