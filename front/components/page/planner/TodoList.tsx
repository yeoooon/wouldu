import { Container } from "@styles/layout";
import { useQuery } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todosState } from "../../../recoil/todos";
import { getDayPlan } from "../../../services/api/planner";
import { formatDate } from "../../../services/utils/formatDate";
import TodoItem from "./TodoItem";
import Check from "/public/icon/check.svg";

const TodoList = () => {
  const [todos, setTodos] = useState<Planner[] | null>(null);

  //day는 나중에 프롭스로 달력 일정에 따라 바뀌도록 설정해야함.
  const day = "2022-11-25";

  const { data: planData } = useQuery(["plan", day], () => getDayPlan(day));

  useEffect(() => {
    setTodos(planData);
    console.log("useQuery", planData);
  }, [planData]);

  return (
    <ListContainer>
      <TitleBox>
        <Check />
        <p>오늘의 추천 활동</p>
      </TitleBox>
      {todos?.map(todo => (
        <TodoItem key={todo.id} id={todo.id} description={todo.description} isCompleted={todo.isCompleted} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled(Container)`
  flex-direction: column;
  height: 90%;
  align-items: flex-start;
  width: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  margin-top: 1em;
  p {
    margin-left: 0.3em;
    color: ${props => props.theme.color.fontMain};
    font-size: ${props => props.theme.fontSize.textMd};
  }
`;

export default TodoList;
