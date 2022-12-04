import { isAlarmModalAtom } from "@recoil/modal";
import { checkRequestFriend } from "@services/api/friend";
import { colors } from "@styles/common_style";
import { Box } from "@styles/layout";
import { Cancel, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import { useQuery } from "@tanstack/react-query";
import { ReceiveFriend } from "@type/friend";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CloseIcon } from "./icons/CloseIcon";

const AlarmModal = () => {
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(isAlarmModalAtom);
  const { data: receiveFriends } = useQuery<ReceiveFriend[]>(["friend", "list"], () => checkRequestFriend("receive"));

  const handleAgreeClick = () => {
    setIsAlarmOpen(false);
  };
  const handleDenyClick = () => {
    setIsAlarmOpen(false);
  };
  return (
    <>
      {isAlarmOpen && (
        <ModalWrapper>
          <ModalContainer height="500px">
            <Cancel onClick={() => setIsAlarmOpen(false)}>
              <CloseIcon />
            </Cancel>
            <ContentArea>
              <Title>알림</Title>
              <FriendAlarm>
                <SubTitle>✓ 친구 요청 확인</SubTitle>
                {receiveFriends && receiveFriends?.length >= 1 ? (
                  receiveFriends.map(friend => (
                    <Content key={friend.id}>
                      <Text>{`${friend.toUserId}님에게 친구요청이 왔습니다.`}</Text>
                      <Box>
                        <AgreeButton onClick={() => handleAgreeClick(fr)}>수락</AgreeButton>
                        <DenyButton onClick={handleDenyClick}>거절</DenyButton>
                      </Box>
                    </Content>
                  ))
                ) : (
                  <NoFriendBox>친구요청이 없습니다.</NoFriendBox>
                )}
              </FriendAlarm>
            </ContentArea>
          </ModalContainer>
          <Overlay />
        </ModalWrapper>
      )}
    </>
  );
};

const ContentArea = styled(Box)`
  flex-direction: column;
  width: 100%;
`;
const FriendAlarm = styled(Box)`
  width: 100%;
  flex-direction: column;
`;
const Content = styled(Box)`
  width: 100%;
  padding: 0.5em 2em;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: ${props => props.theme.fontSize.textLg};
  color: ${props => props.theme.color.fontPoint};
  margin: 1em 0 1.5em 0;
  font-weight: bold;
`;
const SubTitle = styled.p`
  align-self: flex-start;
  padding: 0.5em 1em 0.5em 1.5em;
  color: ${props => props.theme.color.fontPoint};
  font-weight: 600;
`;
const Text = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
`;
const AgreeButton = styled.button`
  font-size: ${props => props.theme.fontSize.textXs};
  padding: 0.3em 0.5em;
  margin-left: 0.3em;
  border-radius: 5px;
`;
const DenyButton = styled(AgreeButton)`
  background-color: ${props => colors.red};
  &:hover {
    background-color: ${props => colors.red};
    opacity: 0.8;
  }
`;
const NoFriendBox = styled(Box)`
  padding: 2em 2em;
`;

export default AlarmModal;
