import styled from "styled-components";

const CloseAccountConfirm = () => {
  return (
    <>
      <BodyBox>
        <DescArea>
          <Title>정말 탈퇴하시겠습니까?</Title>
          <Desc>서비스 탈퇴 시 일정 및 일기 데이터가<br></br>모두 삭제되오니 신중하게 결정해 주세요.</Desc>
          <label><input type="radio"></input>확인했습니다.</label>
        </DescArea>
        <ButtonArea>
          <button>탈퇴</button>
          <button>취소</button>
        </ButtonArea>      
      </BodyBox>
    </>
  )
}

const BodyBox = styled.div`
  width: 300px;
  /* border-radius: ${props => props.theme.borderSize.borderSm};
  border: 1px solid ${props => props.theme.color.border}; */

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

export default CloseAccountConfirm;