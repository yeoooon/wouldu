import { colorList, emojiList } from '@services/utils/emojiList';
import { sumMonthEmotion } from '@services/utils/sumMonthEmotion';
import { testEmotion } from '@services/utils/testEmotion';
import { Box } from '@styles/layout';
import Link from 'next/link';
import React, { useState } from 'react'
import styled, { css } from 'styled-components';

const EmotionAnalysis = () => {
const [selectedEmotion, setSelectedEmotion] = useState<string>('기쁨');
  const [isEmoAnalysisOpen, setIsEmoAnalysisOpen] = useState<boolean>(true);
  const EmotionObj = sumMonthEmotion(testEmotion);
  const totalDays = Object.values(testEmotion).length;

  const handleClickDetail = (key: string) => {
    setIsEmoAnalysisOpen(true);
    setSelectedEmotion(key);
  };

  return (
    <EmotionAnalsisBox>
      {isEmoAnalysisOpen ?
      <EmotionDetailBox bordercolor={colorList(selectedEmotion, 1)}>
        <DetailEmotion>
          <DetailEmoji>{emojiList(selectedEmotion, 40)}</DetailEmoji>
          <DetailTitleBox>
            <DetailTitle>{selectedEmotion}</DetailTitle>  
            <EmotionDetailPercent>{Math.floor(EmotionObj[selectedEmotion]/totalDays * 100)}%</EmotionDetailPercent>
          </DetailTitleBox>    
        </DetailEmotion>
        <DetailText>{` 일기를 쓴 ${totalDays}일 중에 ${selectedEmotion} 감정을 느낀 날은 ${EmotionObj[selectedEmotion]}일로 ${Math.floor(EmotionObj[selectedEmotion]/totalDays * 100)}%입니다.`}</DetailText>
        <ButtonBox>
          <Button onClick={() => setIsEmoAnalysisOpen(false)}>전체 감정보기 →</Button>
          <Link href="/planner">
            <Button>오늘의 추천활동 보러가기 →</Button>
          </Link>
        </ButtonBox>
      </EmotionDetailBox>
      :
      <EmotionCoverBox>
        {Object.entries(EmotionObj).map(([key, value]) => 
          <EmotionBox key={key} bgcolor={colorList(key, 0.2)} bordercolor={colorList(key, 1)} onClick={() => handleClickDetail(key)}>
            <Emoji>{emojiList(key, 18)}</Emoji>
            <TextBox>
              <Emotion>{key}</Emotion>
              <EmotionPercent>{Math.floor(value/totalDays * 100)}%</EmotionPercent>
            </TextBox>
          </EmotionBox>
        )}
      </EmotionCoverBox>}
    </EmotionAnalsisBox>
  )
};

const EmotionAnalsisBox = styled(Box)`
  width: 55%;
  height: 100%;
  padding: 0.5em;
`;
const EmotionCoverBox = styled(Box)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
const EmotionDetailBox = styled(EmotionCoverBox)<{bordercolor: string | null}>`
  background-color: ${props => props.theme.color.nav};
  /* border: 2px solid ${props => props.bordercolor}; */
  flex-direction: column;
  justify-content: space-around;
  padding: 1em;
`;
const EmotionBox = styled(Box)<{bgcolor: string | null, bordercolor: string | null}>`
  justify-content: space-between;
  padding: 0.5em 0.3em 0.5em 0.3em;
  width: 80%;
  ${(props) =>
    css`
      &:hover {
        background: ${props.bgcolor};
        border: 1px solid ${props.bordercolor};
      }
    `}
`;
const Emoji = styled(Box)`
  border-radius: 0;
  width: 4em;
`;
const TextBox = styled(Box)`
  justify-content: space-between;
  width: 80%;
`;
const Emotion = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  margin-right: 0.3em;
  font-weight: 600;
`;
const EmotionPercent = styled(Emotion)`
  font-size: ${props => props.theme.fontSize.textMain};
`;
const DetailEmotion = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const DetailEmoji = styled(Box)`
  width: 30%;
`;
const DetailTitleBox = styled(Box)``;
const DetailTitle = styled(Emotion)`
  font-size: ${props => props.theme.fontSize.textMain};
  align-self: flex-end;
`;
const DetailText = styled.p`
  font-size: ${props => props.theme.fontSize.textSm};
  padding: 0 0.5em;
  line-height: 25px;
  justify-self: flex-start;
  text-align: end;
`;
const EmotionDetailPercent = styled(EmotionPercent)`
  font-size: ${props => props.theme.fontSize.textXl};
  align-self: flex-end;
`;
const ButtonBox = styled(Box)`
  flex-direction: column;
`;
const Button = styled.button`
  padding: 0.3em 1.5em;
  margin-bottom: 0.2em;
  font-size: ${props => props.theme.fontSize.textXs};
  background: none;
  color: ${props => props.theme.color.fontMain};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    background: none;
    font-weight: 700;
  }
`;
export default EmotionAnalysis;
