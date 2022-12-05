import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../styles/common_style";
import { Box } from "@styles/layout";

interface FindPasswordFormValue {
  email: string
}

const FindPasswordForm = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValue>();

  const findPwSubmit = async (data: FindPasswordFormValue) => {
    console.log(data);
    setIsEmailSent((prev) => !prev);
  }

  return (
    <>
      {isEmailSent?
        <>
          <CheckDesc>
            <p>
              메일로 임시 비밀번호를 발송했습니다.
              <br></br>
              확인 후 로그인해 주세요.              
            </p>
            <Link href="/login">
              <button>로그인</button> 
            </Link>        
          </CheckDesc>
        </>
        :
        <>
          <FindTitle>비밀번호 찾기</FindTitle>
          <FindDesc>가입할 때 입력하신 이메일로 임시 비밀번호를 발송해 드립니다.</FindDesc>
          <EmailForm onSubmit={handleSubmit(findPwSubmit)}>
            <InputBox>
              <EmailInput 
                placeholder="이메일을 입력하세요."
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "잘못된 이메일 형식입니다.",
                  },
                })}/>
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>        
            </InputBox>
            <button type="submit">비밀번호 찾기</button>
          </EmailForm>
        </>
      }
    </>
  );
}

export default FindPasswordForm;

const FindTitle = styled.h2`
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textXl};
  height: 50px;
`;

const FindDesc = styled.p`
  color: ${props => props.theme.color.fontSub}
  font-size: ${props => props.theme.fontSize.textMain}
`

const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  button {
    height: 50px;
    margin-top: 20px;
  }
`

const EmailInput = styled.input`
  width: 500px;
  height: 50px;
  font-size: ${props => props.theme.fontSize.textMain};
  padding: 0 10px;

  border: none;
  background-color: ${props => props.theme.color.background};
  border-bottom: 1px solid ${colors.gray_300};

  &:first-child {
    margin-bottom: 10px;
  }
`;

const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CheckDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  p {
    text-align: center;
    line-height: 1.5;
  }
`