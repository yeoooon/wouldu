import { CircleCheckBackIcon, CircleCheckIcon } from "@components/icons/CircleIcon";
import { checkPlan, deletePlan, updatePlan } from "@services/api/planner";
import { Box } from "@styles/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";

const TodoItem = (plan: Planner) => {
  const queryClient = useQueryClient();
  const [editMode, setIsEditMode] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ description: string }>();

  const deleteMutation = useMutation((data: Planner) => deletePlan(data?.id!), {
    onSuccess: (status, value) => {
      queryClient.invalidateQueries(["plan"]);
    },
  });

  const checkMutation = useMutation((data: Planner) => checkPlan(data?.id!), {
    onSuccess: (status, value) => {
      queryClient.invalidateQueries(["plan", value.date]);
    },
  });

  const updateMutation = useMutation((data: Planner) => updatePlan(data), {
    onSuccess: (status, value) => {
      queryClient.invalidateQueries(["plan", value.date]);
    },
  });

  const handleToggle = () => {
    checkMutation.mutate(plan);
  };
  const handleRemoveTodo = async () => {
    deleteMutation.mutate(plan);
  };
  const handleUpdateTodo = () => {
    //description에 수정에 반영될 데이터 넣어주면됨.

    setIsEditMode(true);
    // updateMutation.mutate({ ...plan, description: "일정!" });
  };

  const onUpdateSubmit = async ({ description }: { description: string }) => {
    updateMutation.mutate({ ...plan, description });
    setIsEditMode(false);
    resetField("description");
  };

  return (
    <TodoBox className={plan.isCompleted === 1 ? "finish" : ""}>
      {editMode ? (
        <Form onSubmit={handleSubmit(onUpdateSubmit)}>
          <Input
            autoFocus
            defaultValue={plan.description}
            {...register("description", {
              required: true,
              minLength: { value: 2, message: "2자 이상 입력해주세요." },
            })}
          />
          <p>{errors?.description?.message}</p>
          <ButtonBox>
            <Button type="submit">수정</Button>
            <Button onClick={() => setIsEditMode(false)}>취소</Button>
          </ButtonBox>
        </Form>
      ) : (
        <>
          <CheckBox onClick={handleToggle}>{plan.isCompleted ? <CircleCheckIcon /> : <CircleCheckBackIcon />}</CheckBox>
          <Text>{plan.description}</Text>
          <ButtonBox>
            <Button onClick={() => setIsEditMode(true)}>수정</Button>
            <Button onClick={handleRemoveTodo}>삭제</Button>
          </ButtonBox>
        </>
      )}
    </TodoBox>
  );
};

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: none;
`;
const Button = styled.button`
  background-color: inherit;
  color: ${props => props.theme.color.fontSub};
  border-radius: 0;
  padding: 0 0.8em;
  font-size: 10px;
  &:first-child {
    border-right: 1px solid ${props => props.theme.color.fontSub};
  }
  &:hover {
    background-color: inherit;
    color: ${props => props.theme.color.fontMain};
    font-weight: 600;
  }
`;
const Text = styled.p``;

const TodoBox = styled(Box)`
  position: relative;
  justify-content: space-between;
  padding: 1em 0.5em 1em 2em;
  width: 100%;
  height: 4em;
  margin-bottom: 1em;
  background-color: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.borderPoint};

  &:hover {
    ${ButtonBox} {
      display: initial;
    }
  }
  &.finish {
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.grayBox};
    ${Text} {
      font-style: italic;
      text-decoration: line-through;
      color: ${props => props.theme.color.fontSub};
    }
  }
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  outline: none;
  width: 70%;
  padding: 0.3em 0.5em;
`;
const CheckBox = styled(Box)`
  margin: 0;
  padding: 0;
  position: absolute;
  left: -15px;
  cursor: pointer;
`;

export default TodoItem;
