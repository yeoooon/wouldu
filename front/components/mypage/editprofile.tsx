import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Container } from "../../styles/layout";

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
    <>
      <InfoBox>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <InputArea>
            <ProfileArea>
              <div className="icon">icon</div>
              <label>프로필 사진 업로드</label>
              <input {...register("profileImage")} type="file"></input>
              <p>허용 확장자 *.jpg, *.png | 최대 nKB</p>          
            </ProfileArea>            
          </InputArea>
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
          <InputArea><button type="submit">수정</button></InputArea>
        </form>
      </InfoBox>
    </>
  )
}

const InfoBox = styled(Container)`
  display: flex;
  flex-direction: column;

  button, p {
    font-size: ${props => props.theme.fontSize.textXs}
  }

  .icon {
    width: 100px;
    height: 100px;
    align-self: center;
  }
`

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  label, input, p {
    margin: 0.2rem 0;
  }
`

const InputArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 1rem;
`

export default EditProfile;