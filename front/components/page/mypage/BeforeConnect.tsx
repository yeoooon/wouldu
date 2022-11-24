import Image from "next/image";
import styled from "styled-components";
import { Container } from "../../../styles/layout";

const BeforeConnect = () => {
  return (
    <ContentArea>
      <div className="info">
        <p>일상을 공유하고 싶은 사람과 일기를 연결하세요!</p>
        <Profile>
          <User>
            <Image src="/icon/user.svg" alt="user" width={100} height={100} />
            <p className="userName">로그인한 유저 닉네임</p>
          </User>
          <Mate>
            <Image src="/icon/user.svg" alt="user" width={100} height={100} />
            <p className="mateName">?</p>
          </Mate>
        </Profile>
        <MatchCode>
          <p>나의 연결 코드</p>
          <p className="code">123456</p>          
        </MatchCode>
      </div>
      <div className="button">
        <button>상대방 연결 코드 입력</button>
      </div> 
    </ContentArea>
  )
}

const ContentArea = styled(Container)`
  display: grid;
  grid-template-rows: 70% 30%;

  grid-template-areas:
  "info"
  "button";

  width: 100%;
  height: 70vh;
  
  padding: 1.5rem 0;

  .info, .button {
    display: flex;
    flex-direction: column;
    align-items: center; 
  }

  .info {
    align-self: center;
    gap: 2rem;
  }

  .button {
    align-self: center;
  }
`

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 

  gap: 15px;
`
const Mate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;
`

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  gap: 20px;
`

const MatchCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  .code {
    font-weight: bold;
  }
`

export default BeforeConnect;