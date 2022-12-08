import Link from "next/link";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { mypageState } from "@recoil/mypage";
import { AgreeButton, Cancel, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import { CloseIcon } from "../../../icons/CloseIcon";

const NoDiaryConnect = () => {
  const getMypageConnectTab = useSetRecoilState(mypageState);

  const clickHandle = () => {
    getMypageConnectTab((pre) => "connect");
  }

  return(
    <ModalWrapper>
      <ModalContainer>
        <Link href={'/stamp'}>
          <Cancel>
            <CloseIcon />
          </Cancel>        
        </Link>
        <DescArea>
          <Desc>
            아직 친구와 연결되어 있지 않네요!
            <br></br>
            우쥬 일기는 친구와 일기를 공유하는 서비스입니다.
            <br></br>
            일기를 작성하시려면 먼저 친구와 연결해 주세요.
          </Desc>       
        </DescArea>
        <ButtonArea>
          <Link href={"/mypage"}>
            <Button onClick={clickHandle}>연결하러 가기</Button>
          </Link>   
        </ButtonArea> 
      </ModalContainer>
    </ModalWrapper>
  )
}

export default NoDiaryConnect;

const Desc = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  line-height: 1.5;
  font-weight: 600;
  text-align: center;
`

const DescArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em;
  color: ${props => props.theme.color.fontMain};
`

const Button = styled(AgreeButton)`
  width: 9em;
`;

const ButtonArea = styled.div``;