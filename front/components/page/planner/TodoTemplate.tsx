import { Container } from '@styles/layout'
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
  flex-direction: column;
  width: 100%;
  padding: 8%;
  overflow-y: auto;
`;

export default TodoTemplate
