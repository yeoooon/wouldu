import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isCodeModalAtom } from "@recoil/friend";
import { MatchCodeFormValue } from "@type/friend";
import { ModalBox, ModalWrap, Overlay } from "@styles/modal-style";
import { requestFriend } from "@services/api/friend";

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
        <ModalWrap>
          <ModalBox width="400px" height="200px">
            <CancelButton onClick={handleClickCancel}>x</CancelButton>
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
          </ModalBox>
          <Overlay />
        </ModalWrap>
      )}
    </>
  );
};

const BodyBox = styled.div`
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescArea = styled.div`
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

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
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
const CancelButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin: 10px;
`;
const ConnectButton = styled.button`
  width: 110px;
  height: 30px;
  margin-top: 20px;
`;

export default MatchCodeSubmit;
