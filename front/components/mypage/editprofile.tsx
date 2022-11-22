import styled from "styled-components";
import { Container } from "../../styles/layout";

const EditProfile = () => {
  return (
    <>
      <InfoBox>
        <div className="imageEdit">
          <div className="icon">icon</div>
          <button>프로필 사진 업로드</button>
          <p>허용 확장자 *.jpg, *.png | 최대 nKB</p>
        </div>
        <div className="imageEdit">
          <input disabled placeholder="123456@naver.com"></input>
        </div>
        <div className="imageEdit">
          <input placeholder="수정할 닉네임"></input>
        </div>
        <button type="submit">수정</button>      
      </InfoBox>
    </>
  )
}

const InfoBox = styled(Container)`
  display: flex;
  flex-direction: column;
  
  div, button {
    margin: 0.5rem 0;
  }

  button, p {
    font-size: ${props => props.theme.fontSize.textXs}
  }

  .icon {
    width: 100px;
    height: 100px;
  }

  .imageEdit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export default EditProfile;