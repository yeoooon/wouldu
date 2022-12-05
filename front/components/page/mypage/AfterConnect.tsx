import { UserIcon } from "@components/icons/UserIcon";
import { today } from "@recoil/diary";
import { friendAtom } from "@recoil/friend";
import { isDisconnectModalAtom } from "@recoil/modal";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Container } from "../../../styles/layout";
import DisconnectConfirm from "./modal/DisconnectConfirm";

const AfterConnect = () => {
  const [isDisconnectOpen, setIsDisconnectOpen] = useRecoilState(isDisconnectModalAtom);
  const friend = useRecoilValue(friendAtom);

  const day = useMemo(() => {
    if (friend) {
      const today = new Date();
      const diffDate = today.getTime() - new Date(friend?.createdAt).getTime();

      return Math.trunc(Math.abs(diffDate / (1000 * 60 * 60 * 24))) + 1;
    }
  }, [friend]);

  return (
    <ContentArea>
      <div className="info">
        <DiaryName>
          <p>나와 상대방의 일기장</p>
          <EditButton>수정</EditButton>
        </DiaryName>
        <Profile>
          <User>
            <UserIcon width={80} height={80} />
            <p className="userName">나</p>
          </User>
          <Mate>
            <UserIcon width={80} height={80} />
            <p className="mateName">{friend?.nickname}</p>
          </Mate>
        </Profile>
        <Dday>
          <p>연결한 지</p>
          <p>{day}일</p>
        </Dday>
      </div>
      <div className="button">
        <button onClick={() => setIsDisconnectOpen(true)}>연결 끊기</button>
      </div>
      {isDisconnectOpen && <DisconnectConfirm />}
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

    gap: 1.5rem;
  }

  .info {
    align-self: center;
  }

  .button {
    align-self: start;
  }
`;
const EditButton = styled.button`
  padding: 0.5em;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSize.textSm};
`;

const DiaryName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  gap: 20px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;
const Mate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

const Dday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

export default AfterConnect;
