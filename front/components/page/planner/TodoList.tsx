import { Container } from '@styles/layout';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { todosState } from '../../../recoil/todos';
import TodoItem from './TodoItem';
import Check from '/public/icon/check.svg';


const TodoList = () => {
  const todos = useRecoilValue(todosState);
  // console.log(todos)
  console.log(todos);
  return (
    <ListContainer>
      <TitleBox>
        <Check />
        <p>오늘의 추천 활동</p>
      </TitleBox>
      <TodoItem text='text' done={true} />
      {todos?.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </ListContainer>
  )
}

const ListContainer = styled(Container)`
  flex-direction: column;
  height: 90%;
  align-items: flex-start;
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

export default TodoList
