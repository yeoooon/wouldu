import Image from "next/image";
import styled from "styled-components";
import { Container } from "../../../styles/layout";

const MyInfo = () => {
  return (
    <ContentArea>
      <InfoArea className="info">
        <Image src="/icon/user.svg" alt="user" width={100} height={100} />
        <p className="nickname">닉네임</p>
        <p className="email">이메일</p>        
      </InfoArea>
      <ButtonArea className="button">
        <button>비밀번호 수정</button>
        <button>회원 탈퇴</button>            
      </ButtonArea>
    </ContentArea>
  );
}

const ContentArea = styled(Container)`
  display: grid;
  grid-template-rows: 60% 40%;

  grid-template-areas:
  "info"
  "button";

  width: 100%;
  height: 80%;
  
  padding: 1.5rem 0;
`

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;

  .nickname {
    font-size: ${props => props.theme.fontSize.textMain};
  }

  .email {
    font-size: ${props => props.theme.fontSize.textXs}
  }
`

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  
  gap: 15px;

  button {
    font-size: ${props => props.theme.fontSize.textMain}
  }
`

export default MyInfo;