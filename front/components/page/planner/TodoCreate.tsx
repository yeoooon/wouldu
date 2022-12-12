import { CirclePlusIcon } from "@components/icons/CircleIcon";
import { dayAtom } from "@recoil/planner";
import { colors } from "@styles/common_style";
import { Box, Container } from "@styles/layout";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { createPlan } from "../../../services/api/planner";
import { formatDate } from "../../../services/utils/formatDate";

const TodoCreate = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ description: string }>();
  const queryClient = useQueryClient();

  const handleToggle = () => setOpen(!open);

  //달력날짜에 프롭스로 받아서 변경될 예정
  const recoilDay = useRecoilValue<Date>(dayAtom);
  const pickDay: string = formatDate(recoilDay);

  const updateMutation = useMutation((data: Planner) => createPlan(data), {
    onSuccess: () => {
      const [year, month, day] = pickDay.split("-");
      console.log(year, month);
      queryClient.invalidateQueries(["plan", year]);
    },
  });
  const onCreateSubmit = async (data: Planner) => {
    // priority는 옵션임으로, 우선 1로 셋팅해놓음.
    updateMutation.mutate({ date: pickDay, ...data, priority: 1 });
    setOpen(false);
    resetField("description");
  };

  return (
    <>
      {open ? (
        <CreateContainer>
          <InsertForm onSubmit={handleSubmit(onCreateSubmit)}>
            <BtnBox onClick={handleToggle}>
              <CircleCloseBox>
                <CirclePlusIcon />
              </CircleCloseBox>
            </BtnBox>
            <Input
              autoFocus
              placeholder="할일을 입력 하세요."
              {...register("description", {
                required: true,
                minLength: { value: 2, message: "2자 이상 입력해주세요." },
              })}
            />
            <ErrorMessage>{errors?.description?.message}</ErrorMessage>
            <button type="submit">입력</button>
          </InsertForm>
        </CreateContainer>
      ) : (
        <BtnBox onClick={handleToggle}>
          <CirclePlusBox>
            <CirclePlusIcon />
          </CirclePlusBox>
        </BtnBox>
      )}
    </>
  );
};

const CreateContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
  bottom: 0;
  position: absolute;
`;
const InsertForm = styled.form`
  z-index: 4;
  background: ${props => props.theme.color.purpleBox};
  padding-top: 3em;
  padding-bottom: 3em;
  border-top: 1px solid #e9ecef;
  width: 100%;
  border: 1px solid ${props => props.theme.color.borderPoint};
  border-radius: ${props => props.theme.borderSize.borderSm};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CirclePlusBox = styled(Box)`
  padding: 0;
  margin-top: 2em;
  margin-bottom: 3em;
`;
const CircleCloseBox = styled(CirclePlusBox)`
  top: -20px;
  position: absolute;
  transform: rotate(45deg);
  margin: 0;
`;
const BtnBox = styled(Box)`
  z-index: 5;
  cursor: pointer;
`;
const Input = styled.input`
  height: 2.5em;
  margin: 1em;
  width: 80%;
`;
const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

export default TodoCreate;
