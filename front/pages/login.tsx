import Link from "next/link";
import styled from "styled-components";
import { colors } from "../styles/common_style";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "@type/user";
import { SeoPageProps } from "@components/Seo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Box, Container, Wrapper } from "@styles/layout";

const LOGIN = {
  NORMAL: "normal",
  KAKAO: "kakao",
  GOOGLE: "google",
};

const login = () => {
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
        <SocialContainer>
          <p>SNS 간편로그인 </p>
          <SocialBox>
            <Link href={"/"}>
              <IconBox social={LOGIN.KAKAO}>
                <Image src={"/icon/kakao_icon.svg"} width={20} height={20} alt="kakao" />
              </IconBox>
            </Link>
            <Link href={"/"}>
              <IconBox social={LOGIN.GOOGLE}>
                <Image src={"/icon/google_icon.svg"} width={20} height={20} alt="google" />
              </IconBox>
            </Link>
          </SocialBox>
        </SocialContainer>
        <EtcBox>
          <EtcTextBox>
            <Link href="/join">
              <a>회원가입</a>
            </Link>
          </EtcTextBox>
          <EtcTextBox>
            <Link href="/">
              <a>비밀번호 찾기</a>
            </Link>
          </EtcTextBox>
        </EtcBox>
      </LoginContainer>
    </LoginWrap>
  );
};
export const getServerSideProps = (context: GetServerSidePropsContext) => {
  console.log(context.resolvedUrl);
  console.log(context);
  console.log("haha");

  return {
    props: {
      pageTitle: "로그인",
      pageDesc: "우쥬 로그인 페이지 입니다.",
    },
  };
};

export default login;

const LoginWrap = styled(Wrapper)`
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

const LoginContainer = styled(Container)`
  width: 500px;
  background-color: ${props => props.theme.color.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled(Box)`
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
  margin-top: 20px;
  width: 500px;
  height: 50px;
`;

const SocialContainer = styled(Container)`
  width: 100%;
  padding: 10px 10px;
  margin-top: 20px;
  background-color: ${props => props.theme.color.background};
  justify-content: space-between;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${props => props.theme.color.border};
`;
const SocialBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const IconBox = styled(Box)<{ social: string }>`
  width: 40px;
  height: 40px;
  background-color: ${props => (props.social === LOGIN.KAKAO ? "#FEE500" : colors.white)};
  border: ${props => (props.social === LOGIN.KAKAO ? "none" : "1px solid #7d8bda")};
  border-radius: 50%;
  cursor: pointer;
  &:first-child {
    margin-right: 10px;
  }
  &:hover {
    opacity: 80%;
  }
`;

const EtcBox = styled(Box)`
  margin-top: 20px;
  padding: 10px 0;
  width: 100%;

  & > * {
    text-align: center;
    cursor: pointer;
  }
`;

const EtcTextBox = styled(Box)`
  width: 50%;
  height: 35px;
  border-radius: 0;
  &:first-child {
    border-right: 1px solid ${props => props.theme.color.border};
  }
`;
