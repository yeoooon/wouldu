import { CloseIcon } from "@components/icons/CloseIcon";
import { isDisconnectModalAtom } from "@recoil/modal";
import { Box } from "@styles/layout";
import { AgreeButton, Cancel, DenyButton, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const DisconnectConfirm = () => {
  const setIsDisconnectOpen = useSetRecoilState(isDisconnectModalAtom);

  return (
    <>
      <ModalWrapper>
        <ModalContainer>
          <Cancel onClick={() => setIsDisconnectOpen(false)}>
            <CloseIcon />
          </Cancel>
          <DescArea>
            <Title>정말 연결을 끊으시겠습니까?</Title>
            <Desc>연결을 끊으면 모든 일기 데이터가 삭제됩니다.</Desc>
            <Box>
              <input type="checkbox"/>
              <label>확인하였습니다.</label>
            </Box>
          </DescArea>
          <ButtonArea>
            <AgreeButton onClick={() => setIsDisconnectOpen(false)}>연결 끊기</AgreeButton>
            <DenyButton onClick={() => setIsDisconnectOpen(false)}>취소</DenyButton>
          </ButtonArea> 
        </ModalContainer> 
        <Overlay />    
      </ModalWrapper>
    </>
  );
};

const Title = styled.p`
  font-size: ${props => props.theme.fontSize.textLg};
  margin-bottom: 0.8rem;
`

const Desc = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  margin-bottom: 1rem;
  line-height: 20px;
  font-weight: 600;
`

const DescArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em;
  margin-bottom: 1.5em;
  color: ${props => props.theme.color.fontMain};
  input {
    margin: 0.1em 0.5em 0 0;
    background-color: ${props => props.theme.color.button};
  }
  label {
    font-size: ${props => props.theme.fontSize.textXs};
  }
`

const ButtonArea = styled.div``;

export default DisconnectConfirm;