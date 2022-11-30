import Link from "next/link";
import Image from "next/image";
import LogoLight from "/public/icon/logoblack.svg";
import LogoDark from "/public/icon/logowhite.svg";
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

const AfterNavBar = ({ darkMode, setDarkMode }: LayoutProps) => {
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
        {darkMode ? <LogoDark /> : <LogoLight />}
      </LogoBox>
      <UserBox>
        <AlarmButton>
          <Image src="/icon/alarm.svg" alt="alarm" width={15} height={15} />
        </AlarmButton>
        <Image src="/icon/user.svg" alt="user" width={60} height={60} />
        <TextBox1>{`${user?.nickname} 님`}</TextBox1>
      </UserBox>
      <SwitchBox>
        <input type="checkbox" onChange={toggleTheme} />
        <RoundSlider className="slider"></RoundSlider>
      </SwitchBox>

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
const LogoBox = styled(Box)`
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
  margin: 1em 0;
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

const SwitchBox = styled.label`
  position: relative;
  align-items: center;
  display: inline-block;
  cursor: pointer;
  width: 45px;
  height: 22px;

  input {
    content: "";
    position: absolute;
    left: 0;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: gray;
    transition: left 250ms linear;
  }
  input:checked + .slider {
    background-color: ${props => props.theme.color.button};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
`;
const RoundSlider = styled.span`
  border-radius: 30px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;

  &:before {
  border-radius: 50%;
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 3px;
  bottom: 2.5px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  }
`;

export default AfterNavBar;