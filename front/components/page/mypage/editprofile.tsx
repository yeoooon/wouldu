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
            <Image src="/icon/user.svg" alt="user" width={100} height={100} />
            <label>프로필 사진 업로드</label>
            <input {...register("profileImage")} type="file"></input>
            <p>허용 확장자 *.jpg, *.png | 최대 nKB</p>          
          </ProfileArea>            
          <InputArea>
            <label>이메일</label>
            <input disabled placeholder="123456@naver.com"></input>
          </InputArea>
          <InputArea>
            <label>닉네임</label>
            <input {...register("nickname", {
              required: "수정할 닉네임을 입력해 주세요.",
            })}></input>
          </InputArea>          
        </div>
        <div className="button">
          <button type="submit">수정</button>
        </div>
      </form>
    </ContentArea>
  )
}

const ContentArea = styled(Container)`
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

    gap: 10px;
  }

  .button {
    align-self: start;
    justify-self: center;

    margin-top: 3rem;
  }

  width: 100%;
  height: 80%;
  
  padding: 1.5rem 0;
`

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  align-self: center;

  gap: 10px;
  margin-bottom: 1.5rem;
`

const InputArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export default EditProfile;