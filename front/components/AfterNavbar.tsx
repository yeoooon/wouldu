import Link from "next/link";
import Image from "next/image";
import Logo from "/public/icon/logoblack.svg";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Box, Container } from "../styles/layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../recoil/user";
import { useEffect, useState } from "react";
import { User } from "@type/user";

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AfterNavBar({ darkMode, setDarkMode }: LayoutProps) {
  const router = useRouter();
  const navMenus = ["홈", "일정관리", "교환일기", "마이페이지"];
  const navLinks = ["/stamp", "/planner", "/diary", "/mypage"];

  const [userAtomData, setUserAtomData] = useRecoilState(userAtom);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(userAtomData);
  }, []);

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const onClickLogout = async () => {
    const result = confirm("로그아웃 하시겠어요?");
    if (result) {
      await router.push("/");
      setUser(null);
      setUserAtomData(null);
      sessionStorage.removeItem("userToken");
    }
  };
  return (
    <Nav>
      <LogoBox>
        <Logo width={180} height={60} />
      </LogoBox>
      <UserBox>
        <AlarmButton>
          <Image src="/icon/alarm.svg" alt="alarm" width={15} height={15} />
        </AlarmButton>
        <Image src="/icon/user.svg" alt="user" width={60} height={60} />
        <TextBox1>{`${user?.nickname} 님`}</TextBox1>
      </UserBox>
      <button id="themeBtn" onClick={toggleTheme}>
        Change theme
      </button>
      {/* navigation 구현 */}
      <NavLink>
        {navMenus.map((menu, index) => (
          <Link href={navLinks[index]} key={index}>
            <LinkButton className={router.pathname === navLinks[index] ? "active" : ""}>
              <a>{menu}</a>
            </LinkButton>
          </Link>
        ))}
      </NavLink>
      <a onClick={onClickLogout}>로그아웃</a>
    </Nav>
  );
}

const Nav = styled(Container)`
  flex-direction: column;
  width: 240px;
  height: 100vh;
  justify-content: space-around;
  padding: 2em 0;
  margin: 0;
  border-radius: 0;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
`;
const LogoBox = styled(Logo)`
  width: 100%;
  overflow: visible;
`;
const NavLink = styled(Container)`
  flex-direction: column;
  margin: 1.5em 1em 5em 1em;
  width: 100%;
`;
const LinkButton = styled.div`
  width: 100%;
  height: 10vh;
  border-radius: 0;
  font-size: ${props => props.theme.fontSize.textMd};
  color: ${props => props.theme.color.fontMain};
  background-color: ${props => props.theme.color.nav};
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    background-color: rgba(219, 202, 244, 0.5);
    border-radius: 0px 50px 50px 0px;
    width: 100%;
    a {
      color: ${props => props.theme.color.fontPoint};
      font-size: ${props => props.theme.fontSize.textLg};
      font-weight: bold;
    }
  }
  &:hover {
    background-color: rgba(245, 245, 245, 0.5);
    /* font-size: ${props => props.theme.fontSize.textLg}; */
  }
`;
const UserBox = styled(Container)`
  flex-direction: column;
  width: 35%;
  margin: 3em 0;
`;
const AlarmButton = styled(Box)`
  width: 100%;
  justify-content: flex-end;
  margin: 0.5em;
`;
const TextBox1 = styled(Box)`
  margin-top: 20px;
  font-size: ${props => props.theme.fontSize.textMain};
`;
const TextBox2 = styled(TextBox1)`
  font-size: ${props => props.theme.fontSize.textSm};
`;
