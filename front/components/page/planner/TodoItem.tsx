import { checkPlan, deletePlan, updatePlan } from "@services/api/planner";
import { Box } from "@styles/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import CircleCheck from "/public/icon/circlecheck.svg";
import CircleCheckBack from "/public/icon/circlecheckback.svg";
import Trash from "/public/icon/trash.svg";

const TodoItem = (plan: Planner) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(() => deletePlan(plan?.id!), {
    onSuccess: () => {
      queryClient.invalidateQueries(["plan", plan?.date]);
    },
  });

  const checkMutation = useMutation(() => checkPlan(plan?.id!), {
    onSuccess: () => {
      queryClient.invalidateQueries(["plan", plan?.date]);
    },
  });

  const updateMutation = useMutation((data: Planner) => updatePlan(data), {
    onSuccess: (dat1, data2) => {
      console.log(dat1, data2);
      queryClient.invalidateQueries(["plan", plan.date]);
    },
  });

  const handleToggle = () => {
    // isCompleted 상태 바꾸며, patch 요청
    // 계속 누를때마다 요청을 하는거면...? nest patch는 일부분만 가긴하지만 부하걸릴것이 걱정이다.
    checkMutation.mutate();
  };
  const handleRemoveTodo = async () => {
    deleteMutation.mutate();
  };
  const handleUpdateTodo = () => {
    updateMutation.mutate({ ...plan, description: "제발되라!" });
  };

  return (
    <TodoBox className={plan.isCompleted ? "finish" : ""}>
      <CheckBox onClick={handleToggle}>{plan.isCompleted === 1 ? <CircleCheckSvg /> : <CircleCheckBackSvg />}</CheckBox>
      <Text>{plan.description}</Text>
      <ButtonBox>
        <button onClick={handleUpdateTodo}>수정</button>
        <button onClick={handleRemoveTodo}>삭제</button>
      </ButtonBox>
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

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: none;
`;

const Text = styled.p``;

const TodoBox = styled(Box)`
  position: relative;
  justify-content: space-between;
  padding: 1em 2em;
  width: 100%;
  height: 4em;
  margin-bottom: 1em;
  background-color: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.borderPoint};

  &:hover {
    ${Remove} {
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
const CheckBox = styled(Box)`
  margin: 0;
  padding: 0;
  position: absolute;
  left: -15px;
  cursor: pointer;
`;

const CheckCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background-color: ${props => props.theme.color.purpleBox};
  border: 3px solid ${props => props.theme.color.point};
  border-radius: 50%;
  padding: 0;
  position: absolute;
  left: -15px;
  cursor: pointer;
`;

const CircleCheckSvg = styled(CircleCheck)``;

const CircleCheckBackSvg = styled(CircleCheckBack)``;

export default TodoItem;
