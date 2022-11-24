import styled from "styled-components";

const DisconnectConfirm = () => {
  return (
    <>
      <BodyBox>
        <DescArea>
          <Title>정말 연결을 끊으시겠습니까?</Title>
          <Desc>연결을 끊으면 모든 일기 데이터가 삭제됩니다.</Desc>
          <label><input type="radio"></input>확인했습니다.</label>
        </DescArea>
        <ButtonArea>
          <button>연결 끊기</button>
          <button>취소</button>
        </ButtonArea>      
      </BodyBox>
    </>
  )
}

const BodyBox = styled.div`
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.p`
  font-size: ${props => props.theme.fontSize.textLg};
  margin-bottom: 0.5rem;
`

const Desc = styled.p`
  font-size: ${props => props.theme.fontSize.textMain};
  margin-bottom: 1rem;
  text-align: center;
`

const DescArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 1rem;

  color: ${props => props.theme.color.fontMain};

  label {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`

const ButtonArea = styled.div`
  button {
    margin: 0 0.2rem;
  }
`

export default DisconnectConfirm;