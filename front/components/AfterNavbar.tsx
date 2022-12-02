import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Box, Container } from "../styles/layout";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/user";
import { useEffect, useState } from "react";
import { User } from "@type/user";
import { removeCookie } from "@services/utils/cookies";
import { LogoBlackIcon, LogoWhiteIcon } from "./icons/LogoIcon";
import { AlarmIcon } from "./icons/AlarmIcon";
import { UserIcon } from "./icons/UserIcon";
import { checkRequestFriend } from "@services/api/friend";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AfterNavBar = ({ darkMode, setDarkMode }: LayoutProps) => {
  const router = useRouter();
  const navMenus = ["홈", "일정관리", "교환일기", "마이페이지"];
  const navLinks = ["/stamp", "/planner", "/diary", "/mypage"];

  const queryClient = useQueryClient();

  const [userAtomData, setUserAtomData] = useRecoilState(userAtom);
  const [user, setUser] = useState<User | null>();
  const { data: receiveFriends } = useQuery(["friend"], () => checkRequestFriend("receive"));

  useEffect(() => {
    setUser(userAtomData);
  }, []);

  useEffect(() => {
    console.log("friend receive", receiveFriends);
  }, [receiveFriends]);

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
      setUser(null);
      setUserAtomData(null);
      removeCookie("userToken");
      queryClient.removeQueries({ queryKey: ["user"] });
      await router.push("/");
    }
  };
  return (
    <Nav>
      <LogoBox>{darkMode ? <LogoWhiteIcon /> : <LogoBlackIcon />}</LogoBox>
      <UserBox>
        <AlarmButton>
          <AlarmIcon width={15} height={15} />
          {receiveFriends?.length >= 1 && <p>{receiveFriends.length}</p>}
        </AlarmButton>
        <UserIcon width={60} height={60} />
        <TextBox1>{`${user?.nickname} 님`}</TextBox1>
      </UserBox>
      <DarkModeBox>
        <SwitchBox>
          <input type="checkbox" onChange={toggleTheme} />
          <RoundSlider className="slider"></RoundSlider>
        </SwitchBox>
      </DarkModeBox>

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
};

const Nav = styled(Container)`
  position: relative;
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

const DarkModeBox = styled(Box)`
  overflow: visible;
`;

const SwitchBox = styled.label`
  position: relative;
  align-items: center;
  display: inline-block;
  cursor: pointer;
  width: 2.8em;
  height: 1.4em;

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
    box-shadow: 0 0 1px ${props => props.theme.color.button};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(1.4em);
    -ms-transform: translateX(1.4em);
    transform: translateX(1.4em);
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
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 1.1em;
    width: 1.1em;
    left: 3px;
    bottom: 2.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

export default AfterNavBar;
