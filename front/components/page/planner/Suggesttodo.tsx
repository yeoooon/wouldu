import { Container } from '@styles/layout';
import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import Check from '/public/icon/check.svg';

const Suggesttodo = () => {
  return (
    <SuggestContainer>
      <TitleBox>
        <Check />
        <p>오늘의 추천 활동</p>
      </TitleBox>
      <TodoItem text="감정분석을 통한 해야할일" done={false}/>
    </SuggestContainer>
  )
}

const SuggestContainer = styled(Container)`
  flex-direction: column;
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

export default Suggesttodo
