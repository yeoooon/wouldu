import { Box } from '@styles/layout';
import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { todosState } from '../../../recoil/todos';
import CircleCheck from '/public/icon/circlecheck.svg';
import CircleCheckBack from '/public/icon/circlecheckback.svg';
import Trash from '/public/icon/trash.svg';

interface Todoprops {
  id?: number,
  text: string,
  done: boolean,
}

const TodoItem = ({id, text, done}: Todoprops) => {
  const [todoList, setTodoList] = useRecoilState(todosState);

  const handleToggle = () => {
    setTodoList(items => items.map(item =>
      item.id === id ? {...item, done: !done} : item
    ));
  };
  const handleRemoveTodo = () => {
    setTodoList(items => items.filter(item => item.id !== id));
  };

  return (
    <TodoBox 
      className={done ? "finish" : ""}
    >
      <CheckBox onClick={handleToggle}>
        {done ? <CircleCheckSvg /> : <CircleCheckBackSvg />}
      </CheckBox>
      <Text>{text}</Text>
      <Remove onClick={handleRemoveTodo}>
        <Trash />
      </Remove>
    </TodoBox>
  )
}

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

const CircleCheckSvg = styled(CircleCheck)`
`;

const CircleCheckBackSvg = styled(CircleCheckBack)`
`;

export default TodoItem;
