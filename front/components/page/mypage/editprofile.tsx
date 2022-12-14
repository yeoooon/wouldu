import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Container } from "../../../styles/layout";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { User } from "@type/user";
import { userAtom } from "@recoil/user";
import { UserIcon } from "@components/icons/UserIcon";
import { isChangeNicknameModalAtom, isChangePasswordModalAtom, isDeleteUserModalAtom } from "@recoil/modal";
import DeleteUserConfirm from "./modal/DeleteUserConfirm";
import ChangePassword from "./modal/ChangePassword";
import ChangeNickname from "./modal/ChangeNicknameModal";

interface EditProfileFormValue {
  profileImage: File;
  nickname: string;
}

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormValue>();
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useRecoilState(isDeleteUserModalAtom);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useRecoilState(isChangePasswordModalAtom);
  const [isChangeNickNameOpen, setIsChangeNicknameOpen] = useRecoilState(isChangeNicknameModalAtom);
  const user = useRecoilValue(userAtom);

  const onSubmitHandler: SubmitHandler<EditProfileFormValue> = data => {
    console.log(data);
  };

  return (
    <ContentArea>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <ProfileArea>
          <UserIcon width={100} height={100} />
        </ProfileArea>
      </Form>
      <InfoArea className="info">
        <p className="nickname">{`${user?.nickname} 님`}</p>
        <p className="email">{user?.email}</p>
      </InfoArea>
      <ButtonArea>
        <EditNicknameButton onClick={() => setIsChangeNicknameOpen(true)}>닉네임 변경</EditNicknameButton>
        <EditPasswordButton onClick={() => setIsChangePasswordOpen(true)}>비밀번호 변경</EditPasswordButton>
        <DeleteUserButton onClick={() => setIsDeleteUserOpen(true)}>회원 탈퇴</DeleteUserButton>
      </ButtonArea>
      {isChangeNickNameOpen && <ChangeNickname />}
      {isChangePasswordOpen && <ChangePassword />}
      {isDeleteUserOpen && <DeleteUserConfirm />}
    </ContentArea>
  );
};

const ContentArea = styled(Container)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70vh;
  padding: 1.5rem 0;
`;
const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1em 0 2.5em 0;
  gap: 15px;
  .nickname {
    font-size: ${props => props.theme.fontSize.textMain};
  }
  .email {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const ButtonArea = styled(Box)`
  flex-direction: column;
`;
const EditNicknameButton = styled.button`
  padding: 0.6em 1.3em;
  width: 10em;
`;
const EditPasswordButton = styled(EditNicknameButton)`
  margin: 1em;
`;
const DeleteUserButton = styled.button`
  background: none;
  font-size: ${props => props.theme.fontSize.textXs};
  color: ${props => props.theme.color.fontSub};
  text-decoration: underline;
  text-align: center;
  margin-top: 4em;
  cursor: pointer;
  &:hover {
    background: none;
    font-weight: 700;
  }
`;
export default EditProfile;
