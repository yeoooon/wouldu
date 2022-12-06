import { ResultProps, sumMonthEmotion } from '@services/utils/sumMonthEmotion';
import { testEmotion } from '@services/utils/testEmotion';
import { Box } from '@styles/layout';
import React from 'react'
import styled from 'styled-components';

const EmotionAnalsis = () => {
  const EmotionObj = sumMonthEmotion(testEmotion);
  const totalDays = Object.values(testEmotion).length;

  return (
    <EmotionAnalsisBox>
      {Object.entries(EmotionObj).map(([key, value]) => 
        <EmotionBox>
          <Emoji>😄</Emoji>
          <Emotion>{key}</Emotion>
          <Emotion>{Math.floor(value/totalDays * 100)}%</Emotion>
        </EmotionBox>
      )}
      {/* <EmotionBox>
        <Emoji>😄</Emoji>
        <Emotion>기쁨 80%</Emotion>
      </EmotionBox> */}
      {/* <SuggestTodo>
        내일은 _______를 해보시는 것 어떠세요?
      </SuggestTodo> */}
    </EmotionAnalsisBox>
  )
};

const EmotionAnalsisBox = styled(Box)`
  /* background-color: lightcoral; */
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding: 1.5em;
  height: 80%;
  /* border-radius: 20px 0px 0px 20px; */
`;
const EmotionBox = styled(Box)`
  margin-bottom: 1em;
  /* background-color: pink; */
`;
const Emoji = styled.div`
  font-size: 15px;
  margin-right: 0.3em;
`;
const Emotion = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  margin-right: 0.3em;
`;
const SuggestTodo = styled.p``;
export default EmotionAnalsis;
