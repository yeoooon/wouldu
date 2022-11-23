import styled from "styled-components";
import { Container } from "../../styles/layout";

const AfterMatching = () => {
  return (
    <>
      <InfoBox>
        <span><p>나와 상대방의 일기장</p>수정 아이콘</span>
        <div className="profile">
          <div className="user">
            <div className="icon">프로필 아이콘</div>
            <p className="userName">로그인한 유저 닉네임</p>
          </div>
          <div className="mate">
            <div className="icon">프로필 아이콘</div>
            <p className="mateName">상대방 유저 닉네임</p>
          </div>
        </div>
        <div className="dday">
          <p>연결한 지</p>
          <p>1일</p>
          <button>연결 끊기</button>
        </div>        
      </InfoBox>

    </>
  )
}

const InfoBox = styled(Container)`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;  
  }

  .profile {
    display: flex;
    flex-direction: row;
  }
  
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

  .icon {
    width: 100px;
    height: 100px;
  }
`

export default AfterMatching;