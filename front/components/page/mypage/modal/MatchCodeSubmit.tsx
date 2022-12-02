import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isCodeModalAtom } from "@recoil/friend";
import { MatchCodeFormValue } from "@type/friend";

const MatchCodeSubmit = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MatchCodeFormValue>();
  const [isCodeShow, setIsCodeShow] = useRecoilState(isCodeModalAtom);
  const onSubmitHandler: SubmitHandler<MatchCodeFormValue> = data => {
    console.log(data);
  };

  const handleClickConnect = () => {
    setIsCodeShow(false);
  };

  return (
    <>
      {isCodeShow && (
        <BodyBox>
          <DescArea>
            <Title>상대방의 연결 코드를 입력하세요.</Title>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <InputArea>
                <input
                  {...register("friendCode", {
                    required: "연결 코드를 입력해 주세요.",
                    //validation 필요
                  })}
                ></input>
                <ErrorMessage>{errors?.friendCode?.message}</ErrorMessage>
                <button onClick={handleClickConnect}>연결하기</button>
              </InputArea>
            </form>
          </DescArea>
        </BodyBox>
      )}
    </>
  );
};

const BodyBox = styled.div`
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

const DescArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${props => props.theme.color.fontMain};

  input {
    display: flex;
    flex-direction: column;

    width: 100px;
    height: 30px;

    margin-bottom: 1rem;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
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

export default MatchCodeSubmit;
