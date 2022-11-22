import Link from "next/link";
import styled from "styled-components";
import Seo from "../components/Seo";
import { colors } from "../styles/common_style";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "@type/user";
import { SeoPageProps } from "@components/Seo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserLoginForm>();

  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <LoginWrap>
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>

        {/* <form onSubmit={onSubmit}> */}
        <InputBox>
          <LoginInput placeholder="아이디를 입력하세요." />
          <ErrorMessage>error!!!</ErrorMessage>
        </InputBox>
        <InputBox>
          <LoginInput placeholder="아이디를 입력하세요." />
          <ErrorMessage>error!!!</ErrorMessage>
        </InputBox>

        <LoginButton>로그인</LoginButton>
        {/* </form> */}
        <div>
          <div>SNS 간편로그인 </div>
          {/* <div />  이미지
        <div /> 이미지 */}
        </div>
        <div>
          <Link href="/join">
            <a>회원가입</a>
          </Link>
          <Link href="/">
            <a>비밀번호 찾기</a>
          </Link>
        </div>
      </LoginContainer>
    </LoginWrap>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(context);

  return {
    props: {
      pageTitle: "로그인",
      pageDesc: "우쥬 로그인 페이지 입니다.",
    },
  };
}

const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.background};
`;
const LoginTitle = styled.h2`
  color: ${props => props.theme.color.fontMain};
  font-size: ${props => props.theme.fontSize.textXl};
  height: 50px;
  margin-bottom: 20px;
`;

const LoginContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

const LoginInput = styled.input`
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

const LoginButton = styled.button`
  width: 500px;
  height: 50px;
`;
