import styled from "styled-components";
import { Container } from "../../styles/layout";

const BeforeMatching = () => {
  return (
    <>
      <InfoBox>
        <p>일상을 공유하고 싶은 사람과 일기를 연결하세요!</p>
        <div className="profile">
          <div className="user">
            <div className="icon">프로필 아이콘</div>
            <p className="userName">로그인한 유저 닉네임</p>
          </div>
          <div className="mate">
            <div className="icon">프로필 아이콘</div>
            <p className="mateName">?</p>
          </div>
        </div>
        <div className="matchCode">
          <p>나의 연결 코드</p>
          <p className="code">123456</p>
          <button>상대방 연결 코드 입력</button>
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

  p.code {
    font-weight: bold;
  }

  .icon {
    width: 100px;
    height: 100px;
  }
`

export default BeforeMatching;