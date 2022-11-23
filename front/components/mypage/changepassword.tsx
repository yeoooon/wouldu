import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Container } from "../../styles/layout";

interface ChangePasswordFormValue {
  currentPassword: string
  toChangePassword: string
  toChangePasswordConfirm: string
}

const ChangePassword = () => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<ChangePasswordFormValue>();
  
  const onSubmitHandler: SubmitHandler<ChangePasswordFormValue> = (data) => {
    console.log(data);
  }

  return (
    <>
      <InfoBox>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <label>현재 비밀번호</label>
          <InputArea>
            <input {...register("currentPassword", { required: "현재 비밀번호를 입력해 주세요." })}></input>
            <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>            
          </InputArea>
          <label>변경할 비밀번호</label>
          <InputArea>
            <input {...register("toChangePassword", {
              required: "변경할 비밀번호를 입력해 주세요.",
              minLength: { value: 8, message: "8자 이상 입력해 주세요." },
              })} type="password"></input>
            <ErrorMessage>{errors?.toChangePassword?.message}</ErrorMessage>            
          </InputArea>
          <label>변경할 비밀번호 확인</label>
          <InputArea>
            <input {...register("toChangePasswordConfirm", {
              required: "변경할 비밀번호를 한 번 더 입력해 주세요.",
              validate: value => watch("toChangePassword") === value || "변경할 비밀번호가 일치하지 않습니다.",
              })} type="password"></input>
            <ErrorMessage>{errors?.toChangePasswordConfirm?.message}</ErrorMessage>          
          </InputArea>
          <ButtonArea>
            <button type="submit">수정</button>
            <button>취소</button>            
          </ButtonArea>
        </form>        
      </InfoBox>
    
    </>
  )
}

const InfoBox = styled(Container)`
  display: flex;
  flex-direction: column;

  label {
   color: ${props => props.theme.color.fontMain};
   font-size: ${props => props.theme.fontSize.textMain};
  }

  input {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
    
    width: 300px;
    height: 30px;
  }

  button {
    margin-right: 0.5rem;
    font-size: ${props => props.theme.fontSize.textXs};
  }
`

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const ErrorMessage = styled.p`
  color: ${props => props.theme.color.fontMain};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;


export default ChangePassword;