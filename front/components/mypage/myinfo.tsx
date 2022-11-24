import Image from "next/image";
import styled from "styled-components";
import { Container } from "../../styles/layout";

const MyInfo = () => {
  return (
    <>
      <InfoBox>
        <Image src="/icon/user.svg" alt="user" width={100} height={100} />
        <div className="nickname">닉네임</div>
        <div className="email">이메일</div>
        <ButtonArea>
          <button>비밀번호 수정</button>
          <button>회원 탈퇴</button>            
        </ButtonArea>

      </InfoBox>
    </>
  );
}

const InfoBox = styled(Container)`
  display: flex;
  flex-direction: column;
  
  div, button {
    margin: 0.5rem 0;
  }

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

  button {
    font-size: ${props => props.theme.fontSize.textXs}
  }
`

export default MyInfo;