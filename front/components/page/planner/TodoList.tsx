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

  useEffect(() => {
    (async () => {
      const data = await getDayPlan(formatDate(new Date())); // 임의로 현재날짜 전달
      // console.log(data);
      setTodos(data);
    })();
  }, []);

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
