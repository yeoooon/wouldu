import Image from "next/image";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Container } from "../../../styles/layout";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { User } from "@type/user";
import { userAtom } from "@recoil/user";

interface EditProfileFormValue {
  profileImage: File
  nickname: string
}

const EditProfile = () => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<EditProfileFormValue>();
  const userAtomData = useRecoilValue(userAtom);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(userAtomData);
  }, []);

  const onSubmitHandler: SubmitHandler<EditProfileFormValue> = (data) => {
    console.log(data);
  }

  return (
    <ContentArea>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <ProfileArea>
          <Image src="/icon/user.svg" alt="user" width={80} height={80} />
          <label>프로필 사진 업로드</label>
          <input {...register("profileImage")} type="file"></input>
          <p>허용 확장자 *.jpg, *.png | 최대 nKB</p>
        </ProfileArea>    
        <InputArea>
          <Email>
            <label>이메일</label>
            <input disabled placeholder={user?.email}/>
          </Email>
          <Nickname>
            <label>닉네임</label>
            <input
              defaultValue={user?.nickname}
              {...register("nickname", {
              required: "수정할 닉네임을 입력해 주세요.",
            })}/>
          </Nickname>             
        </InputArea>
        <EditButton type="submit">닉네임 수정</EditButton>
      </Form>
      <ButtonArea>
        <EditPasswordButton>비밀번호 수정</EditPasswordButton>
        <DeleteUserButton>회원 탈퇴</DeleteUserButton>
      </ButtonArea>
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
`
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
`

const InputArea = styled(Box)`
  flex-direction: column;
  gap: 10px;
  margin: 2em;
  width: 100%;
`
const EditButton = styled.button`
  padding: 0.6em 1.3em;
`;
const Email = styled(Box)`
  width: 100%;
  label {
    margin-right: 0.5em;
  }
  input {
    padding: 0.5em;
    width: 75%;
  }
`
const Nickname = styled(Email)``;
const ButtonArea = styled(Box)`
  flex-direction: column;
`;
const EditPasswordButton = styled(EditButton)`
  margin: 1em;
`;
const DeleteUserButton = styled.button`
  background: none;
  font-size: ${props => props.theme.fontSize.textXs};
  color: ${props => props.theme.color.fontSub};
  text-decoration: underline;
  text-align: center;
  margin-top: 1em;
  cursor: pointer;
  &:hover {
    background: none;
    font-weight: 700;
  }
`;
export default EditProfile;