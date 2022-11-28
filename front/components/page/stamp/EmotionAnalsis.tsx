import { Box } from '@styles/layout';
import React from 'react'
import styled from 'styled-components';

const EmotionAnalsis = () => {
  return (
    <EmotionAnalsisBox>
      <EmotionBox>
        <Emoji>😄</Emoji>
        <Emotion>기쁨 80%</Emotion>
      </EmotionBox>
      <SuggestTodo>
        내일은 _______를 해보시는 것 어떠세요?
      </SuggestTodo>
    </EmotionAnalsisBox>
  )
};

const EmotionAnalsisBox = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  height: 60%;
  padding: 1.5em;
  border-radius: 20px 0px 0px 20px;
`;
const EmotionBox = styled(Box)`
  margin-bottom: 1em;
`;
const Emoji = styled.div`
  font-size: 30px;
  margin-right: 0.3em;
`;
const Emotion = styled.p`
  font-size: ${props => props.theme.fontSize.textLg};
`;
const SuggestTodo = styled.p``;
export default EmotionAnalsis;
