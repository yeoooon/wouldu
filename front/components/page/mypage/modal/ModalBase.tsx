import styled from "styled-components";
import { Box } from "../../../../styles/layout";

import CloseAccountConfirm from "./CloseAccountConfirm";
import MatchCodeSubmit from "./MatchCodeSubmit";
import DisconnectConfirm from "./DisconnectConfirm";

const ModalBase = () => {
  return (
    <>
      <ModalBox>
        <QuitArea>
          <p>X</p>
        </QuitArea>
        <MainArea>
          {/* <CloseAccountConfirm></CloseAccountConfirm> */}
          {/* <MatchCodeSubmit></MatchCodeSubmit> */}
          <DisconnectConfirm></DisconnectConfirm>
        </MainArea>
      </ModalBox>
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