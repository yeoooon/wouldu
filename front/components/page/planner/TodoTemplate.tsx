import { Box, Container } from '@styles/layout'
import React from 'react'
import styled from 'styled-components'
import Suggesttodo from './Suggesttodo'
import TodoCreate from './TodoCreate'
import TodoList from './TodoList'

const TodoTemplate = () => {
  return (
    <TemplateContainer>
      <Suggesttodo />
      <TodoList />
      <TodoCreate />
    </TemplateContainer>
  )
}

const TemplateContainer = styled(Container)`
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3vh 5vh;
  height: 100%;
  overflow-y: auto;
`;
export default TodoTemplate;
