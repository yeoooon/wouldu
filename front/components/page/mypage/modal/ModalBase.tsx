import styled from "styled-components";
import { Box } from "../../../../styles/layout";
import MatchCodeSubmit from "./MatchCodeSubmit";
import DisconnectConfirm from "./DisconnectConfirm";
import { Cancel, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import Layout from "@components/Layout";
import { CloseIcon } from "@components/icons/CloseIcon";

const ModalBase = () => {
  return (
    <>
      <ModalWrapper>
        <ModalContainer>
          <Cancel>
            <CloseIcon />
          </Cancel>
          <MainArea>
            {/* <MatchCodeSubmit></MatchCodeSubmit> */}
            <DisconnectConfirm></DisconnectConfirm>
          </MainArea>
        </ModalContainer>
        <Overlay />
      </ModalWrapper>
    </>
  )
}

const ModalBox = styled(Box)`
  flex-direction: column;
  background-color: ${props => props.theme.color.purpleBox};

  padding: 1rem 1rem;

  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.theme.color.border};
`

const QuitArea = styled.div`
  align-self: flex-end;
`

const MainArea = styled.div`
  padding: 1rem 2rem;
`

export default ModalBase;