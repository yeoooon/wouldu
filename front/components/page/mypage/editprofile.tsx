import Image from "next/image";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Container } from "../../../styles/layout";

interface EditProfileFormValue {
  profileImage: File
  nickname: string
}

const EditProfile = () => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<EditProfileFormValue>();

  const onSubmitHandler: SubmitHandler<EditProfileFormValue> = (data) => {
    console.log(data);
  }

  return (
    <ContentArea>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="info">
          <ProfileArea>
            <Image src="/icon/user.svg" alt="user" width={80} height={80} />
            <label>프로필 사진 업로드</label>
            <input {...register("profileImage")} type="file"></input>
            <p>허용 확장자 *.jpg, *.png | 최대 nKB</p>          
          </ProfileArea>    
          <InputArea>
            {/* <Email>
              <label>이메일</label>
              <input disabled placeholder="123456@naver.com"></input>
            </Email> */}
            <Nickname>
              <label>닉네임</label>
              <input {...register("nickname", {
                required: "수정할 닉네임을 입력해 주세요.",
              })}></input>
            </Nickname>             
          </InputArea>
        </div>
        <div className="button">
          <button type="submit">수정</button>
        </div>
      </form>
      <ButtonArea className="button">
        <button>비밀번호 수정</button>
        <p>회원 탈퇴</p>
      </ButtonArea>
    </ContentArea>
  )
}

const ContentArea = styled(Container)`
  flex-direction: column;
  align-items: center;
  form {
    height: 100%;
    
    display: grid;
    grid-template-rows: 70% 30%;

    grid-template-areas:
    "info"
    "button";
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-self: end;

    gap: 2.5rem;
  }

  .button {
    align-self: start;
    justify-self: center;

    margin-top: 3rem;
  }

  width: 100%;
  height: 70vh;
  
  padding: 1.5rem 0;
`

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  align-self: center;

  gap: 10px;
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  label {
    margin: 0.5em;
  }
`

const Email = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const Nickname = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;

  button {
    font-size: ${props => props.theme.fontSize.textMain};
    padding: 0.6em;
  }
  p {
    font-size: ${props => props.theme.fontSize.textXs};
    color: ${props => props.theme.color.fontSub};
    text-decoration: underline;
    text-align: center;
    margin-top: 1em;
    cursor: pointer;
  }
`;

export default EditProfile;