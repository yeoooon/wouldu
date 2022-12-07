import { CloseIcon } from "@components/icons/CloseIcon";
import { isChangeNicknameModalAtom } from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { changeUserNickname } from "@services/api/user";
import { Box } from "@styles/layout";
import { AgreeButton, Cancel, DenyButton, ModalContainer, ModalWrapper, Overlay, Title } from "@styles/modal_layout";
import { User } from "@type/user";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

interface EditProfileFormValue {
  profileImage?: File;
  nickname: string;
}

const ChangeNickname = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormValue>();
  const userAtomData = useRecoilValue(userAtom);
  const setIsChangeNicknameOpen = useSetRecoilState(isChangeNicknameModalAtom);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(userAtomData);
  }, []);

  const onSubmitHandler: SubmitHandler<EditProfileFormValue> = data => {
    setIsChangeNicknameOpen(false);
    changeUserNickname({ id: user?.id!, nickname: data.nickname });
  };

  return (
    <ModalWrapper>
      <ModalContainer height="300px">
        <Cancel onClick={() => setIsChangeNicknameOpen(false)}>
          <CloseIcon />
        </Cancel>
        <Title>닉네임 변경</Title>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <InputArea>
            <Email>
              <label>이메일</label>
              <input disabled placeholder={user?.email} />
            </Email>
            <Nickname>
              <label>닉네임</label>
              <input
                defaultValue={user?.nickname}
                {...register("nickname", {
                  required: "수정할 닉네임을 입력해 주세요.",
                })}
              />
            </Nickname>
          </InputArea>
          <ButtonArea>
            <AgreeButton type="submit">변경</AgreeButton>
            <DenyButton onClick={() => setIsChangeNicknameOpen(false)}>취소</DenyButton>
          </ButtonArea>
        </Form>
      </ModalContainer>
      <Overlay />
    </ModalWrapper>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputArea = styled(Box)`
  flex-direction: column;
  gap: 10px;
  margin: 0.5em 0 1.5em 0;
  width: 100%;
`;
const ButtonArea = styled(Box)``;
const Email = styled(Box)`
  width: 100%;
  label {
    margin-right: 0.5em;
  }
  input {
    padding: 0.5em;
    width: 80%;
  }
`;
const Nickname = styled(Email)``;

export default ChangeNickname;
