import { UserIcon } from "@components/icons/UserIcon";
import Image from "next/image";
import styled from "styled-components";
import { Container } from "../../../styles/layout";

const AfterConnect = () => {
  return (
    <ContentArea>
      <div className="info">
        <DiaryName>
          <p>나와 상대방의 일기장</p>
          <button>수정</button>
        </DiaryName>
        <Profile>
          <User>
            <UserIcon width={80} height={80} />
            <p className="userName">나</p>
          </User>
          <Mate>
            <UserIcon width={80} height={80} />
            <p className="mateName">상대방</p>
          </Mate>
        </Profile>
        <Dday>
          <p>연결한 지</p>
          <p>1일</p>
        </Dday>        
      </div>
      <div className="button">
        <button>연결 끊기</button>          
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

    gap: 1.5rem;
  }

  .info {
    align-self: center;
  }

  .button {
    align-self: start;
  }
`

const DiaryName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
`

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  gap: 20px;
`

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 

  gap: 10px;
`
const Mate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`

const Dday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`

export default AfterConnect;