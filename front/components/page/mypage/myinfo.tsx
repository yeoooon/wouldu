import { UserIcon } from "@components/icons/UserIcon";
import SurveyModal from "@components/SurveyModal";
import {
  isChangeNicknameModalAtom,
  isChangePasswordModalAtom,
  isDeleteUserModalAtom,
  isSurveyModalAtom,
} from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { getUserInfo } from "@services/api/user";
import { useQuery } from "@tanstack/react-query";
import { User } from "@type/user";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import css from "styled-jsx/css";
import { Box, Container } from "../../../styles/layout";
import ChangeNickname from "./modal/ChangeNickname";
import ChangePassword from "./modal/ChangePassword";
import DeleteUserConfirm from "./modal/DeleteUserConfirm";

const MyInfo = () => {
  const userAtomData = useRecoilValue(userAtom);
  // const [user, setUser] = useState<User | null>();
  const [isSurveyOpen, setIsSurveyOpen] = useRecoilState<boolean>(isSurveyModalAtom);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useRecoilState(isDeleteUserModalAtom);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useRecoilState(isChangePasswordModalAtom);
  const [isChangeNickNameOpen, setIsChangeNicknameOpen] = useRecoilState(isChangeNicknameModalAtom);

  const { data: user } = useQuery<User>(["user", "info"], () => getUserInfo(userAtomData?.id!));

  useEffect(() => {
    console.log("mypage user", user);
  }, [user]);

  return (
    <ContentArea>
      <UpperBox>
        <InfoArea className="info">
          <UserIcon width={90} height={90} />
          <p className="nickname">{`${user?.nickname} 님`}</p>
          <p className="email">{user?.email}</p>
        </InfoArea>
        <CategoryArea>
          {user?.survey?.map(item => (
            <Category key={item} className={item === "" ? "empty" : ""}>
              {item}
            </Category>
          ))}
        </CategoryArea>
        <Button onClick={() => setIsSurveyOpen(true)}>나의 카테고리 변경하러 가기 →</Button>
      </UpperBox>
      <UnderButtonBox>
        <ButtonArea>
          <EditNicknameButton onClick={() => setIsChangeNicknameOpen(true)}>닉네임 변경</EditNicknameButton>
          <EditPasswordButton onClick={() => setIsChangePasswordOpen(true)}>비밀번호 변경</EditPasswordButton>
        </ButtonArea>
        <DeleteUserButton onClick={() => setIsDeleteUserOpen(true)}>회원 탈퇴</DeleteUserButton>
      </UnderButtonBox>
      {isChangeNickNameOpen && <ChangeNickname />}
      {isChangePasswordOpen && <ChangePassword />}
      {isDeleteUserOpen && <DeleteUserConfirm />}
      {isSurveyOpen ? <SurveyModal /> : ""}
    </ContentArea>
  );
};

const ContentArea = styled(Container)`
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 70vh;
  padding: 2rem;
`;
const UpperBox = styled(Box)`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 80%;
`;
const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 7vh;
  margin-bottom: 1em;
  gap: 15px;
  .nickname {
    font-size: ${props => props.theme.fontSize.textMain};
  }
  .email {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;
const CategoryArea = styled(Box)`
  flex-wrap: wrap;
  width: 20em;
`;
const Category = styled(Box)`
  padding: 0.5em 0.8em;
  background-color: ${props => props.theme.color.purpleBox};
  font-size: ${props => props.theme.fontSize.textXs};
  border-radius: 30px;
  margin: 0.3em;
  &.empty {
    display: none;
  }
`;
const Button = styled.button`
  margin: 1em 0 2em 0;
  padding: 0.5em;
  font-size: ${props => props.theme.fontSize.textSm};
  background: none;
  color: ${props => props.theme.color.fontMain};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    background: none;
    font-weight: 700;
  }
`;
const UnderButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  bottom: 5vh;
  /* background-color: red; */
`;
const ButtonArea = styled(Box)``;
const EditNicknameButton = styled.button`
  padding: 0 1em;
  margin-top: 1.5em;
  border-radius: 0;
  font-size: ${props => props.theme.fontSize.textSm};
  background: none;
  color: ${props => props.theme.color.fontMain};
  cursor: pointer;
  &:hover {
    background: none;
    font-weight: 700;
  }
`;
const EditPasswordButton = styled(EditNicknameButton)`
  border-left: 1px solid ${props => props.theme.color.fontMain};
`;
const DeleteUserButton = styled.button`
  margin-top: 2em;
  background: none;
  font-size: ${props => props.theme.fontSize.textXs};
  color: ${props => props.theme.color.fontSub};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    background: none;
    font-weight: 700;
    color: ${props => props.theme.color.fontMain};
  }
`;

export default MyInfo;
