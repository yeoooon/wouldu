import Link from "next/link";
import styled from "styled-components";
import Seo from "../components/Seo";
import { colors } from "../styles/common_style";

export default function login() {
  return (
    <LoginWrap>
      <LoginContainer>
        <Seo title="로그인" />
        <LoginTitle>로그인</LoginTitle>
        <InputBox>
          <LoginInput placeholder="아이디를 입력하세요." />
          <LoginInput placeholder="비밀번호를 입력하세요." />
        </InputBox>
        <button>로그인</button>
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
`;

const LoginInput = styled.input`
  border: none;
  background-color: ${props => props.theme.color.background};
  border-bottom: 1px solid ${colors.gray_300};

  &:first-child {
    margin-bottom: 10px;
  }
`;
