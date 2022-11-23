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
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 720px;
`;