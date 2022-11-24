import Image from "next/image";
import styled from "styled-components";
import { Container } from "../../../styles/layout";

const AfterConnect = () => {
  return (
    <>
      <InfoBox>
        <span><p>나와 상대방의 일기장</p>수정 아이콘</span>
        <Profile>
          <User>
            <Image src="/icon/user.svg" alt="user" width={80} height={80} />
            <p className="userName">나</p>
          </User>
          <Mate>
            <Image src="/icon/user.svg" alt="user" width={80} height={80} />
            <p className="mateName">상대방</p>
          </Mate>
        </Profile>
        <Dday>
          <p>연결한 지</p>
          <p>1일</p>
        </Dday>     
        <button>연결 끊기</button>   
      </InfoBox>

    </>
  )
}

const InfoBox = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center; 

  div, button {
    margin: 0.5rem 0;
  }

  button {
    font-size: ${props => props.theme.fontSize.textXs};
  }

  p {
    color: ${props => props.theme.color.fontMain};
    font-size: ${props => props.theme.fontSize.textMain};
  }
`

const Profile = styled.div`
  display: flex;
  flex-direction: row;


`

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`
const Mate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Dday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default AfterConnect;