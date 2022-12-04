import { CloseIcon } from "@components/icons/CloseIcon";
import { isDeleteUserModalAtom } from "@recoil/modal";
import { Box } from "@styles/layout";
import { ModalWrapper, ModalContainer, Overlay, Cancel, AgreeButton, DenyButton } from "@styles/modal_layout";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const DeleteUserConfirm = () => {
  const setIsDeletUserOpen = useSetRecoilState(isDeleteUserModalAtom);

  return (
    <>
      <ModalWrapper>
        <ModalContainer>
          <Cancel onClick={() => setIsDeletUserOpen(false)}>
            <CloseIcon />
          </Cancel>
          <DescArea>
            <Title>정말 탈퇴하시겠습니까?</Title>
            <Desc>서비스 탈퇴 시 일정 및 일기 데이터가<br></br>모두 삭제되오니 신중하게 결정해 주세요.</Desc>
            <Box>
              <input type="checkbox"/>
              <label>확인하였습니다.</label>
            </Box>
          </DescArea>
          <ButtonArea>
            <AgreeButton onClick={() => setIsDeletUserOpen(false)}>탈퇴</AgreeButton>
            <DenyButton onClick={() => setIsDeletUserOpen(false)}>취소</DenyButton>
          </ButtonArea>
        </ModalContainer>
        <Overlay />   
      </ModalWrapper>
    </>
  )
}

const Title = styled.p`
  font-size: ${props => props.theme.fontSize.textLg};
  margin-bottom: 0.5rem;
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
  margin: 1rem;
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

export default DeleteUserConfirm;