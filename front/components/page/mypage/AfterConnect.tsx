import { CheckIcon, PencilIcon, SmallCheckIcon } from "@components/icons/CheckIcon";
import { UserIcon } from "@components/icons/UserIcon";
import { today } from "@recoil/diary";
import { isDisconnectModalAtom } from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { changeDiaryTitle, getFriend } from "@services/api/friend";
import { fontSize } from "@styles/common_style";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Friend, FriendInfo, FriendProps } from "@type/friend";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Container } from "../../../styles/layout";
import DisconnectConfirm from "./modal/DisconnectConfirm";

const timeReset = (date: Date) => {
  const targetResetTime: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return targetResetTime.getTime();
};

const AfterConnect = ({ friend }: FriendProps) => {
  const queryClient = useQueryClient();
  const [isDisconnectOpen, setIsDisconnectOpen] = useRecoilState(isDisconnectModalAtom);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ title: string }>();

  const updateMutation = useMutation(({ title }: { title: string }) => changeDiaryTitle(title), {
    onSuccess: (status, value) => {
      queryClient.invalidateQueries(["friend", "info"]);
      setIsEdit(false);
      resetField("title");
    },
  });

  const day = useMemo(() => {
    if (friend) {
      const today = new Date();
      const targetDay = new Date(friend?.createdAt);

      const diffDate = timeReset(today) - timeReset(targetDay);
      return Math.trunc(Math.abs(diffDate / (1000 * 60 * 60 * 24))) + 1;
    }
  }, [friend]);

  const onChangeSubmit = async ({ title }: { title: string }) => {
    updateMutation.mutate({ title });
  };

  return (
    <>
      <ContentArea>
        <div className="info">
          {isEdit ? (
            <div>
              <Form onSubmit={handleSubmit(onChangeSubmit)}>
                <Input
                  autoFocus
                  defaultValue={friend.title}
                  placeholder="다이어리 이름을 입력해주세요."
                  {...register("title", {
                    required: true,
                    minLength: { value: 2, message: "2자 이상 입력해주세요." },
                  })}
                />
                <EditButton type="submit">
                  {" "}
                  <SmallCheckIcon />
                </EditButton>
              </Form>
              <ErrorMessage>{errors?.title?.message}</ErrorMessage>
            </div>
          ) : (
            <>
              <DiaryName>
                <p>{friend.title}</p>
                <EditIcon onClick={() => setIsEdit(true)}>
                  <PencilIcon />
                </EditIcon>
              </DiaryName>
            </>
          )}
          <Profile>
            <User>
              <UserIcon width={80} height={80} />
              <p className="userName">나</p>
            </User>
            <Mate>
              <UserIcon width={80} height={80} />
              <p className="mateName">{friend?.nickname}</p>
            </Mate>
          </Profile>
          <Dday>
            <p>연결한 지</p>
            <p>{day}일</p>
          </Dday>
        </div>
        <DisconnectA onClick={() => setIsDisconnectOpen(true)}>연결 끊기</DisconnectA>
        {isDisconnectOpen && <DisconnectConfirm />}
      </ContentArea>
    </>
  );
};

const ContentArea = styled(Container)`
  display: grid;
  position: relative;
  /* grid-template-rows: 70% 30%; */

  grid-template-areas: "info";

  width: 100%;
  height: 70vh;

  padding: 1.5rem 0;

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1.5rem;
  }

  .info {
    align-self: center;
  }
`;
const EditButton = styled.button`
  position: absolute;
  padding: 0;
  right: 0;
  border-radius: 6px;
  width: 30px;
  height: 30px;
`;

const DiaryName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  gap: 20px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;
const Mate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

const Dday = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

const ErrorMessage = styled.p`
  font-size: ${fontSize.textXs};
  margin-top: 5px;
`;

const DisconnectA = styled.a`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
  background-color: ${props => props.theme.color.nav};
  border-bottom: 1px solid ${props => props.theme.color.fontMain};
  font-size: ${fontSize.textSm};
`;

const Form = styled.form`
  display: flex;
  position: relative;
`;
const EditIcon = styled.div`
  cursor: pointer;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 6px;
  padding-right: 40px;
`;

export default AfterConnect;
