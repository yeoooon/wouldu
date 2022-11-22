import Link from "next/link";
import { useState } from "react";

import styled from "styled-components";
import React from "react";

const MypageTab = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <Tab>
      <p className="clicked">내 정보</p>
      <hr></hr>
      <p>프로필 수정</p>
      <hr></hr>
      <p>연결 관리</p>
    </Tab>
  );
}

const Tab = styled.div`
  background-color: ${props => props.theme.color.background};
  display: flex;
  justify-content: space-between;
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
`

export default MypageTab;