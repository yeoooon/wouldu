import { UserIcon } from "@components/icons/UserIcon";
import { today } from "@recoil/diary";
import { isDisconnectModalAtom } from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { getFriend } from "@services/api/friend";
import { fontSize } from "@styles/common_style";
import { useQuery } from "@tanstack/react-query";
import { Friend, FriendInfo, FriendProps } from "@type/friend";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Container } from "../../../styles/layout";
import DisconnectConfirm from "./modal/DisconnectConfirm";

const timeReset = (date: Date) => {
  const targetResetTime: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return targetResetTime.getTime();
};

const AfterConnect = ({ friend }: FriendProps) => {
  const [isDisconnectOpen, setIsDisconnectOpen] = useRecoilState(isDisconnectModalAtom);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const day = useMemo(() => {
    if (friend) {
      const today = new Date();
      const targetDay = new Date(friend?.createdAt);

      const diffDate = timeReset(today) - timeReset(targetDay);
      return Math.trunc(Math.abs(diffDate / (1000 * 60 * 60 * 24))) + 1;
    }
  }, [friend]);

  return (
    <>
      <ContentArea>
        <div className="info">
          {isEdit ? (
            <div>
              <input />
              <EditButton onClick={() => setIsEdit(true)}>수정</EditButton>
            </div>
          ) : (
            <>
              <DiaryName>
                <p>나와 상대방의 일기장</p>
                <EditButton onClick={() => setIsEdit(true)}>수정</EditButton>
              </DiaryName>
            </>
          )}
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
        <DisconnectA onClick={() => setIsDisconnectOpen(true)}>연결 끊기</DisconnectA>
        {isDisconnectOpen && <DisconnectConfirm />}
      </ContentArea>
    </>
  );
};

const ContentArea = styled(Container)`
  display: grid;
  position: relative;
  /* grid-template-rows: 70% 30%; */

  grid-template-areas: "info";

  width: 100%;
  height: 70vh;

  padding: 1.5rem 0;

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1.5rem;
  }

  .info {
    align-self: center;
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

const DisconnectA = styled.a`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
  background-color: ${props => props.theme.color.nav};
  border-bottom: 1px solid ${props => props.theme.color.fontMain};
  font-size: ${fontSize.textSm};
`;

export default AfterConnect;
