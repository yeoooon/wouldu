import { useState } from "react";

import styled from "styled-components";
import React from "react";
import { pageProps } from "../../../pages/mypage";

const MypageTab = ({ pageState, setPageState }: pageProps) => {
  const [clicked, setClicked] = useState(false);

  return (
    <Tab>
      <p className={pageState === "mypage" ? "clicked" : ""} onClick={() => setPageState("mypage")}>
        내 정보
      </p>
      <hr></hr>
      <p className={pageState === "profile" ? "clicked" : ""} onClick={() => setPageState("profile")}>
        프로필 수정
      </p>
      <hr></hr>
      <p className={pageState === "connect" ? "clicked" : ""} onClick={() => setPageState("connect")}>
        연결 관리
      </p>
    </Tab>
  );
};

const Tab = styled.div`
  display: flex;
  justify-content: center;

  width: 300px;

  p {
    font-size: ${props => props.theme.fontSize.textMain};
    margin: 0.5rem 0.5rem;
    color: ${props => props.theme.color.fontSub};
  }
  p:hover {
    color: ${props => props.theme.color.fontMain};
  }

  hr {
    border-top: 1px solid ${props => props.theme.color.fontMain};
  }

  p.clicked {
    color: ${props => props.theme.color.fontMain};
  }
`;

export default MypageTab;
