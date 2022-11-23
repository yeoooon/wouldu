import { Box, Container } from '@styles/layout';
import { Todos } from '@type/todos';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { todosState } from '../../../recoil/todos';
import CirclePlus from '/public/icon/circleplus.svg';

let id = 0
const getId = () => id++;

const TodoCreate = () => {
  const [open, setOpen] = useState(false);
  const setTodoList = useSetRecoilState(todosState);
  const [text, setText] = useState('');

  const handleToggle = () => setOpen(!open);
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {currentTarget: {value}} = event;
    setText(value);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text,
        done: false,
      },
    ]);
    setOpen(false)
    setText("")
  };

  return (
    <>
    {open ? 
    <CreateContainer>
      <InsertForm onSubmit={handleSubmit}>
        <BtnBox onClick={handleToggle}>
          <CircleCloseSvg />
        </BtnBox>
        <Input
          autoFocus
          placeholder='할일을 입력 하세요'
          onChange={handleChange}
          value={text}
        />
      </InsertForm>
    </CreateContainer>
    :
    <BtnBox onClick={handleToggle}>
      <CirclePlusSvg />
    </BtnBox>
    }
    </>
  )
}

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
const CircleCloseSvg = styled(CirclePlus)`
  top: -20px;
  position: absolute;
  transform: rotate(45deg);
`;
const CirclePlusSvg = styled(CirclePlus)`
  margin-top: 2em;
  margin-bottom: 3em;
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

export default TodoCreate;
