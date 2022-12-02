import { UserIcon } from "@components/icons/UserIcon";
import { isCodeModalAtom } from "@recoil/friend";
import { userAtom } from "@recoil/user";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Container } from "../../../styles/layout";
import MatchCodeSubmit from "./modal/MatchCodeSubmit";

const BeforeConnect = () => {
  const user = useRecoilValue(userAtom);
  const [isCodeShow, setIsCodeShow] = useRecoilState(isCodeModalAtom);

  return (
    <ContentArea>
      <div className="info">
        <p>아직 연결된 사람이 없어요!</p>
        <p>일상을 공유하고 싶은 사람과 일기를 연결하세요!</p>
        <Profile>
          <User>
            <UserIcon width={80} height={80} />
            <p className="userName">{user?.nickname}</p>
          </User>
          <Mate>
            <UserIcon width={80} height={80} />
            <p className="mateName">?</p>
          </Mate>
        </Profile>
        <MatchCode>
          <p>나의 연결 코드</p>
          <p className="code">{user?.friendCode}</p>
        </MatchCode>
      </div>
      <div className="button">
        <button onClick={() => setIsCodeShow(true)}>상대방 연결 코드 입력</button>
      </div>
      <MatchCodeSubmit />
    </ContentArea>
  );
};

const ContentArea = styled(Container)`
  display: grid;
  grid-template-rows: 70% 30%;

  grid-template-areas:
    "info"
    "button";

  width: 100%;
  height: 70vh;

  padding: 1.5rem 0;

  .info,
  .button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info {
    align-self: center;
    gap: 2rem;
  }

  .button {
    align-self: start;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;
`;
const Mate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  gap: 20px;
`;

const MatchCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  .code {
    font-weight: bold;
  }
`;

export default BeforeConnect;
