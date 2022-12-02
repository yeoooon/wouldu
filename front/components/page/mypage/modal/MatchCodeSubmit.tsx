import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isCodeModalAtom } from "@recoil/friend";
import { MatchCodeFormValue } from "@type/friend";
import { requestFriend } from "@services/api/friend";
import { Cancel, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import { CloseIcon } from "@components/icons/CloseIcon";

const MatchCodeSubmit = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<MatchCodeFormValue>();
  const [isCodeShow, setIsCodeShow] = useRecoilState(isCodeModalAtom);
  const onSubmitHandler: SubmitHandler<MatchCodeFormValue> = async data => {
    const status = await requestFriend(data);
    switch (status) {
      case 201:
        alert("요청이 완료되었습니다.");
        resetInput();
        break;
      case 400:
        alert("이미 친구 요청했습니다.");
        resetInput();
        break;
      case 404:
        alert("친구의 코드를 다시 확인해주세요.");
        break;
    }
  };

  const resetInput = () => {
    setIsCodeShow(false);
    resetField("code");
  };

  const handleClickCancel = () => {
    resetInput();
  };

  return (
    <>
      {isCodeShow && (
        <ModalWrapper>
          <ModalContainer width="400px" height="200px">
            <Cancel onClick={handleClickCancel} ><CloseIcon /></Cancel>
            <DescArea>
              <Title>상대방의 연결 코드를 입력하세요.</Title>
              <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <input
                  {...register("code", {
                    required: "연결 코드를 입력해 주세요.",
                    //validation 필요
                  })}
                ></input>
                <ErrorMessage>{errors?.code?.message}</ErrorMessage>
                <ConnectButton>연결하기</ConnectButton>
              </Form>
            </DescArea>
          </ModalContainer>
          <Overlay />
        </ModalWrapper>
      )}
    </>
  );
};


const DescArea = styled.div`
  margin: 1em;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color.fontMain};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.p`
  font-size: ${props => props.theme.fontSize.textMain};
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.color.fontMain};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

const ConnectButton = styled.button`
  width: 110px;
  height: 30px;
  margin-top: 20px;
`;

export default MatchCodeSubmit;
