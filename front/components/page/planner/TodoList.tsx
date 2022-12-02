import { dayAtom } from "@recoil/planner";
import { Container } from "@styles/layout";
import { useQuery } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getDayPlan } from "@services/api/planner";
import { formatDate } from "@services/utils/formatDate";
import TodoItem from "./TodoItem";
import usePlanQuery from "@hooks/usePlanQuery";
import { CheckIcon } from "@components/icons/CheckIcon";

const TodoList = () => {
  const [todos, setTodos] = useState<Planner[] | null>(null);

  const recoilDay = useRecoilValue<Date>(dayAtom);
  const day = formatDate(recoilDay);
  const { data: planData } = usePlanQuery(day);

  useEffect(() => {
    console.log(planData);
    setTodos(planData);
  }, [planData]);

  return (
    <ListContainer>
      <TitleBox>
        <CheckIcon />
        <p>오늘의 할일</p>
      </TitleBox>
      {todos?.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          description={todo.description}
          isCompleted={todo.isCompleted}
          date={todo.date}
        />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  p {
    margin-left: 0.3em;
    color: ${props => props.theme.color.fontMain};
    font-size: ${props => props.theme.fontSize.textMd};
  }
`;

export default TodoList;
